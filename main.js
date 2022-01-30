// THANKS TO DIKA ARDNT.

"use strict";

require('./message/config')

const { 
default: makeWASocket,
BufferJSON, 
initInMemoryKeyStore, 
DisconnectReason, 
AnyMessageContent, 
delay, 
useSingleFileAuthState , 
generateForwardMessageContent, 
prepareWAMessageMedia, 
generateWAMessageFromContent, 
generateMessageID, 
proto,
downloadContentFromMessage 
} = require("@adiwajshing/baileys-md")
const figlet = require("figlet");
const fs = require("fs");
const chalk = require('chalk')
const fetch = require('node-fetch')
const FileType = require('file-type')
const P = require('pino')
const yargs = require('yargs')
const help = require('./lib/help')
const { color, DashaLog } = require("./lib/color");
let setting = JSON.parse(fs.readFileSync('./config.json'));
let sesion = `./${setting.sessionName}.json`
const { state, saveState } = useSingleFileAuthState(sesion)
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, formatp, sleep, getBuffer, serialize } = require('./lib/myfunc')



global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

global.db = new (require('./lib/database'))(`${opts._[0] ? opts._[0] + '_' : ''}database.json`, null, 2)
global.db.data = {
users: {},
chats: {},
database: {},
absen: {},
cmd: {},
settings: {},
...(global.db.data || {})
}


const start = async () => {
console.log(color(figlet.textSync('Dasha Bot MD', {
font: 'Standard',
horizontalLayout: 'default',
vertivalLayout: 'default',
whitespaceBreak: false
	}), 'cyan'))
console.log(color('[ By Senkuu. ]'))

const dasha = makeWASocket({ printQRInTerminal: true, logger: P({ level: 'silent' }), auth: state }) 
dasha.multi = true
dasha.nopref = false
dasha.prefa = 'anjing'
console.log(color('Connected....'))
 dasha.ev.on('messages.upsert', async m => {
if (!m.messages) return
const msg = m.messages[0]
const mess = serialize(dasha, msg)
//const mess.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
const M = smsg(dasha, msg)
switch (M.mtype) {
case "imageMessage": 
case "videoMessage":
case "audioMessage":
case "stickerMessage":
case "documentMessage":
case "senderKeyDistributionMessage":
if (!M.key.fromMe) await sleep(1000)
const quoted = M.msg ? M.msg.url : M.quoted.url
if (!quoted) await dasha.refreshMediaConn(true)
break
	} 
require('./message/dasha')(dasha, msg, mess, m, M, help, setting)
})

dasha.ev.on('group-participants.update', async (anu) => {
require('./message/group')(dasha, anu)
})


let dbJson = JSON.stringify(global.db.data)
if (!opts['test']) setInterval(() => {
console.log(chalk.redBright('Reading Database...'))
if (JSON.stringify(global.db.data) == dbJson) console.log(chalk.redBright('Database Update Now...'))
else {
global.db.save()
console.log(chalk.redBright('Done Update Database...'))
let dbJson = JSON.stringify(global.db.data)
}
}, 60 * 1000)


dasha.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
console.log(DashaLog('connection closed, try to restart'))
lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut 
? start()
: console.log(DashaLog('Wa web terlogout.'))
}
})


dasha.ev.on('creds.update', () => saveState)


dasha.sendText = (jid, text, quoted = '', options) => dasha.sendMessage(jid, { text: text, ...options }, { quoted })

dasha.sendImageAsSticker = async (jid, path, quoted, options = {}) => {

let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}

await dasha.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

/**
 * 
 * @param {*} jid 
 * @param {*} path 
 * @param {*} quoted 
 * @param {*} options 
 * @returns 
 */


dasha.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}

await dasha.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

dasha.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {

let quoted = message.msg ? message.msg : message

let mime = (message.msg || message).mimetype || ''
let messageType = mime.split('/')[0].replace('application', 'document') ? mime.split('/')[0].replace('application', 'document') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
let trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
// save to file
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}   


/**
 * Send Buttons
 * @param {String} jid
 * @param {String} content
 * @param {String} footer
 * @param {String} button1
 * @param {String} row1
 * @param {Object} quoted
 * @param {Object} options
 */

dasha.sendButton = async(jid, content, footer, button1, row1, quoted, options = {}) => {
return await dasha.sendMessage(jid, {
text: content,
footer: footer,
buttons: [
  { buttonId: row1, buttonText: { displayText: button1 }, type: 1 }
],
headerType: 1
  },{quoted, ...options})
}

dasha.send2Button = async(jid, content, footer, button1, row1, button2, row2, quoted, options = {}) => {
return await dasha.sendMessage(jid, {
text: content,
footer: footer,
buttons: [
  { buttonId: row1, buttonText: { displayText: button1 }, type: 1 },
  { buttonId: row2, buttonText: { displayText: button2 }, type: 1 }
],
headerType: 1
  },{quoted, ...options })
}

   
   
dasha.getFile = async (path) => {
let res
let data = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (res = await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : typeof path === 'string' ? path : Buffer.alloc(0)
if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
let type = await FileType.fromBuffer(data) || {
	mime: 'application/octet-stream',
	ext: '.bin'
}

return {
	res,
	...type,
	data
}
}


dasha.sendMedia = async (jid, path, filename, quoted = '', options = {}) => {
	 let { ext, mime, data } = await dasha.getFile(path)
	 let messageType = mime.split("/")[0]
	 let pase = messageType.replace('application', 'document') || messageType
	 return await dasha.sendMessage(jid, { [`${pase}`]: data, mimetype: mime, fileName: filename+ext ? filename+ext : getRandom(ext), ...options }, { quoted })

}   
   
   
   
/**
 * 
 * @param {*} jid 
 * @param {*} message 
 * @param {*} forceForward 
 * @param {*} options 
 * @returns 
 */
dasha.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
	message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
	vtype = Object.keys(message.message.viewOnceMessage.message)[0]
	delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
	delete message.message.viewOnceMessage.message[vtype].viewOnce
	message.message = {
...message.message.viewOnceMessage.message
	}
}

let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await dasha.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

dasha.cMod = (jid, message, text = '', sender = dasha.user.id, options = {}) => {
let copy = message.toJSON()
let mtype = Object.keys(copy.message)[0]
let isEphemeral = mtype === 'ephemeralMessage'
if (isEphemeral) {
mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
}
let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
let content = msg[mtype]
if (typeof content === 'string') msg[mtype] = text || content
else if (content.caption) content.caption = text || content.caption
else if (content.text) content.text = text || content.text
if (typeof content !== 'string') msg[mtype] = {
	...content,
	...options
}
if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
copy.key.remoteJid = jid
copy.key.fromMe = sender === dasha.user.id

return proto.WebMessageInfo.fromObject(copy)
}   
  
return dasha
}

start()
.catch(err => console.log(err))
