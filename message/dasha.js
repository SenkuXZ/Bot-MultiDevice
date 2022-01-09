"use strict";

require('./config')

//Module
const {
default: makeWASocket,
WASocket, 
AuthenticationState,
WAMessage, 
Contact, 
areJidsSameUser,
SocketConfig, 
DisconnectReason, 
BaileysEventMap,
GroupMetadata,
AnyMessageContent,
MessageType,
MiscMessageGenerationOptions,
BufferJSON,
delay,
proto,
useSingleFileAuthState,
downloadContentFromMessage,
WAMessageStubType,
generateWAMessage,
generateWAMessageFromContent
} = require('@adiwajshing/baileys-md')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { fromBuffer } = require('file-type')
const path = require('path')
const PhoneNumber = require('awesome-phonenumber')
const moment = require("moment-timezone");
const { exec, spawn } = require("child_process");
const hx = require('hxz-api');
const axios = require('axios')
const speed = require('performance-now')
const os = require('os')
const { performance } = require('perf_hooks')
const ffmpeg = require('fluent-ffmpeg')
const yts = require('yt-search')
const imgbb = require('imgbb-uploader');
const fetch = require('node-fetch')

 
//Library
const { color, bgcolor } = require("../lib/color");
const { smsg, formatp, getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep , tanggal, clockString} = require("../lib/myfunc");
const skrep = require('../lib/scrape')
const { yta, ytv, upload } = require("../lib/ytdl");
//const { servers, yta, ytv } = require('../lib/y2mate')
const { UploadFileUgu, webp2mp4File, TelegraPh } = require('../lib/uploader')

moment.tz.setDefault("Asia/Jakarta").locale("id");
 
module.exports = async(dasha, msg, m, M, help, setting) => {
try {
let { ownerNumber, botName } = setting
let timeout = 60000
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('DD/MM/YY HH:mm:ss z')
const salam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const from = msg.key.remoteJid
const content = JSON.stringify(msg.message)
const chats = (M.mtype === 'conversation' && msg.message.conversation) ? msg.message.conversation : (M.mtype == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (M.mtype == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (M.mtype == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (M.mtype == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (M.mtype == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (M.mtype == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ""

var prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~zZ+×_*!#%^&./\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓=|~xzZ+×_*!#,|`÷?;:%^&./\\©^]/gi) : ''	  

const command = chats.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = chats.trim().split(/ +/).slice(1)

//const command = chats.toLowerCase().split(' ')[0] || ''
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const pushname = msg.pushName || "No Name"
const isCmd = command.startsWith(prefix)
const run = process.uptime()
const q = args.join(" ")
const body = chats.startsWith(prefix) ? chats : ''
const botNumber = dasha.user.id.split(':')[0] + '@s.whatsapp.net'
const groupMetadata = isGroup ? await dasha.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender) || false
const isOwner = ownerNumber.includes(sender)
const isNumber = x => typeof x === 'number' && !isNaN(x)
const mentionUser = [...new Set([...(m.mentionedJid || []), ...(M.quoted ? [M.quoted.sender] : [])])]

const isUrl = (uri) => {
return uri.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}

const jsonformat = (json) => {
return JSON.stringify(json, null, 2)
}


const antibot = M.isBaileys
if(antibot === true)return
const quoted = M.quoted ? M.quoted : M
const mime = (quoted.msg || quoted).mimetype || '' 
const isMedia = /image|video|sticker|audio/.test(mime)

const isWebp = (M.mtype === 'imageMessage' || M.mtype === 'videoMessage')
const isImage = (M.mtype == 'imageMessage')
const isVideo = (M.mtype == 'videoMessage')
const isSticker = (M.mtype == 'stickerMessage')
const isQuotedMsg = (M.mtype == 'extendedTextMessage')
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false


if(setting.Mode === 'Self'){
if (!isOwner) return 
}

function parseMention(text) {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}


// DATABASE
try {
let users = global.db.data.users[M.sender]
if (typeof users !== 'object') global.db.data.users[M.sender] = {}
if (users) {
if (!isNumber(users.afkTime)) users.afkTime = -1
if (!('banned' in users)) users.banned = false
if (!('afkReason' in users)) users.afkReason = ''
} else global.db.data.users[M.sender] = {
afkTime: -1,
banned: false,
afkReason: '',
}
 
let chats = global.db.data.chats[M.chat]
if (typeof chats !== 'object') global.db.data.chats[M.chat] = {}
if (chats) {
if (!('setWelcome' in chats)) chats.setWelcome = ''
if (!('setLeave' in chats)) chats.setLeave = ''
} else global.db.data.chats[M.chat] = {
setWelcome: '',
setLeave: '',
}

let settings = global.db.data.settings[botNumber]
if (typeof settings !== 'object') global.db.data.settings[botNumber] = {}
if (settings) {
if (!('available' in settings)) settings.available = false
if (!('composing' in settings)) settings.composing = false
if (!('recording' in settings)) settings.recording = false
} else global.db.data.settings[botNumber] = {
available: false,
composing: false,
recording: false,
}
} catch (err) {
console.log(err)
}


// STATUS BOT
const used = process.memoryUsage()
const cpus = os.cpus().map(cpu => {

cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
return cpu
})
const cpu = cpus.reduce((last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
}, {
speed: 0,
total: 0,
times: {
user: 0,
nice: 0,
sys: 0,
idle: 0,
irq: 0
}
})


// FUNC downloadMediaMessage

function _0x670e(_0x65ca96,_0x2fbbd9){const _0x34dedf=_0x34de();return _0x670e=function(_0x670ecb,_0x13dfce){_0x670ecb=_0x670ecb-0x1ba;let _0x450cb4=_0x34dedf[_0x670ecb];return _0x450cb4;},_0x670e(_0x65ca96,_0x2fbbd9);}function _0x34de(){const _0x274669=['257077unetvF','msg','7xOldYz','document','from','4261140yYcSJa','10078670FXeDFD','2568296AdpCPk','concat','18Tqksne','1672044AnTaAB','application','4520136abzeLa','2OUNvIj','807350MQvWjs','mimetype','split','replace'];_0x34de=function(){return _0x274669;};return _0x34de();}(function(_0x5901c0,_0x65ad42){const _0x483f6d=_0x670e,_0x8b9b58=_0x5901c0();while(!![]){try{const _0x2f6826=-parseInt(_0x483f6d(0x1c0))/0x1*(parseInt(_0x483f6d(0x1bb))/0x2)+parseInt(_0x483f6d(0x1ca))/0x3+parseInt(_0x483f6d(0x1c7))/0x4+parseInt(_0x483f6d(0x1bc))/0x5+parseInt(_0x483f6d(0x1c5))/0x6+parseInt(_0x483f6d(0x1c2))/0x7*(parseInt(_0x483f6d(0x1ba))/0x8)+-parseInt(_0x483f6d(0x1c9))/0x9*(parseInt(_0x483f6d(0x1c6))/0xa);if(_0x2f6826===_0x65ad42)break;else _0x8b9b58['push'](_0x8b9b58['shift']());}catch(_0x292d51){_0x8b9b58['push'](_0x8b9b58['shift']());}}}(_0x34de,0x58b18));const downloadMediaMessage=async _0x2becde=>{const _0xca4b49=_0x670e;let _0x17cd2b=(_0x2becde[_0xca4b49(0x1c1)]||_0x2becde)[_0xca4b49(0x1bd)]||'',_0x777061=_0x17cd2b['split']('/')[0x0][_0xca4b49(0x1bf)](_0xca4b49(0x1cb),_0xca4b49(0x1c3))?_0x17cd2b[_0xca4b49(0x1be)]('/')[0x0]['replace']('application',_0xca4b49(0x1c3)):_0x17cd2b[_0xca4b49(0x1be)]('/')[0x0],_0x287db7=_0x17cd2b[_0xca4b49(0x1be)]('/')[0x1];const _0x40c37d=await downloadContentFromMessage(_0x2becde,_0x777061);let _0x32882a=Buffer[_0xca4b49(0x1c4)]([]);for await(const _0x238df8 of _0x40c37d){_0x32882a=Buffer[_0xca4b49(0x1c8)]([_0x32882a,_0x238df8]);}return _0x32882a;};


const reply = (teks, men) => {
 return dasha.sendMessage(from, { text: teks, mentions: men ? men : [] }, { quoted: msg })
}

const replyNtag = (teks, buffer = fs.readFileSync(setting.pathImg)) => {
dasha.sendMessage(from, { text: teks,jpegThumbnail: buffer, mentions: parseMention(teks) }, { quoted: msg })
}

const textImg = (teks, buffer = fs.readFileSync(setting.pathImg), mess, men) => {
 return dasha.sendMessage(from, { text: teks, jpegThumbnail: buffer, mention: men ? men : [] }, { quoted: mess ? mess : msg })
}

const sendMess = (from, teks) => {
 return dasha.sendMessage(from, { text: teks })
}


const sendFile = async (from, url, caption, msg, men) => {
let mime = '';
let res = await axios.head(url)
mime = res.headers['content-type']
if (mime.split("/")[1] === "gif") {
return dasha.sendMessage(from, { video: await convertGif(url), caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: msg})
}
let type = mime.split("/")[0]+"Message"
if(mime.split("/")[0] === "image"){
return dasha.sendMessage(from, { image: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg})
} else if(mime.split("/")[0] === "video"){
return dasha.sendMessage(from, { video: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg})
} else if(mime.split("/")[0] === "audio"){
return dasha.sendMessage(from, { audio: await getBuffer(url), caption: caption, mentions: men ? men : [], mimetype: 'audio/mpeg'}, {quoted: msg })
} else {
return dasha.sendMessage(from, { document: await getBuffer(url), mimetype: mime, caption: caption, mentions: men ? men : []}, {quoted: msg })
}
}

//Please dont edit for urlbutton 
const buttonsDefault = [
{ callButton: {displayText: `Number Owner`, phoneNumber: `+628127668234`} },
{ urlButton: { displayText: `Github Bot`, url : `https://github.com/SenkuXZ`} },
{ quickReplyButton: { displayText: `Owner`, id: `${prefix}owner` } },
{ quickReplyButton: { displayText: `Tos`, id: `${prefix}rules` } }
]

const textTemplateButtons = (from, text, footer, buttons) => {
return dasha.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
}

dasha.sendReadReceipt(from, sender, [msg.key.id])





const sendButton5 = async (id, text1, desc1, yo) => {
var buatpesan = await generateWAMessageFromContent(from, {
"templateMessage": {
"hydratedTemplate": {
...yo.message,
"hydratedContentText": text1,
"hydratedFooterText": desc1,
"hydratedButtons": [
{
"urlButton": {
"displayText": "𝑮𝒊𝒕𝒉𝒖𝒃 𝑶𝒘𝒏𝒆𝒓",
"url": "https://github.com/SenkuXZ"
}
},
{
"callButton": {
"displayText": "𝑪𝒂𝒍𝒍 𝑶𝒘𝒏𝒆𝒓",
"phoneNumber": "6281804680327"
}
},
{
"quickReplyButton": {
"displayText": "𝑫𝒐𝒏𝒂𝒕𝒆",
"id": `${prefix}donasi`
}
},
{
"quickReplyButton": {
"displayText": "𝑺𝒄𝒓𝒊𝒑𝒕",
"id": `${prefix}script`,
}
},
{
"quickReplyButton": {
"displayText": "𝑶𝒘𝒏𝒆𝒓",
"id": `${prefix}owner`
}
}
]
}
}
}, {})
dasha.relayMessage(id, buatpesan.message, { messageId: buatpesan.key.id})
}


dasha.createMessage = async (jidnya, kontennya, optionnya) => {
return await generateWAMessage(jidnya, kontennya, {...optionnya,userJid: dasha.authState.creds.me.id,upload: dasha.waUploadToServer})
}



if (M.message) {
console.log(chalk.black(chalk.greenBright('[ PESAN ]')), chalk.bold(chalk.bgGreen(new Date)), chalk.black(chalk.whiteBright(chats || M.mtype)) + '\n' + chalk.greenBright('=> Dari'), chalk.bold(chalk.bgGreen(pushname)), chalk.yellow(M.sender) + '\n' + chalk.greenBright('=> Di'), chalk.bold(chalk.bgGreen(M.isGroup ? groupName : 'Private Chat', M.chat)))
}

if (isOwner){
if (chats.startsWith("> ")){
console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`From Owner`))
try {
let evaled = await eval(chats.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
textImg(`${evaled}`)
} catch (err) {
textImg(`${err}`)
}
} else if (chats.startsWith("$ ")){
console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`From Owner`))
exec(chats.slice(2), (err, stdout) => {
if (err) return textImg(`${err}`)
if (stdout) textImg(`${stdout}`)
})
}
}




// BANNED
 if (db.data.users[M.sender].banned && isCmd) {
await replyNtag(`Maaf @${M.sender.split("@")[0]} Anda Telah Dibanned, Chat Owner Untuk Un Banned`)
return
}

	// Afk
try{
	for (let jid of mentionUser) {
let user = global.db.data.users[jid]
if (!user) continue
let afkTime = user.afkTime
if (!afkTime || afkTime < 0) continue
let reason = user.afkReason || ''
M.reply(`
Jangan tag dia!
Dia sedang AFK ${reason ? 'dengan alasan ' + reason : 'tanpa alasan'}
Selama ${clockString(new Date - afkTime)}
`.trim())
}

if (db.data.users[M.sender].afkTime > -1) {
let user = global.db.data.users[M.sender]
M.reply(`
Kamu berhenti AFK${user.afkReason ? ' setelah ' + user.afkReason : ''}
Selama ${clockString(new Date - user.afkTime)}
`.trim())
user.afkTime = -1
user.afkReason = ''

}
} catch {}

function _0x3725(){const _0x489e76=['quoted','toString','isGroup','emit','fileSha256','WebMessageInfo','541817vcekjD','12JuXTbL','fromObject','1026636ZmyoVn','data','pushName','10emQIEr','user','sender','key','fakeObj','msg','2021440ShtdnP','fromMe','5881162CdVdlY','append','197220iwUwKO','1497618DdogdV','chat','participant','10wOXdTy','messages.upsert','4303512zZyIRo','base64','cmd'];_0x3725=function(){return _0x489e76;};return _0x3725();}function _0x476b(_0x51cf4e,_0x5dfa94){const _0x3725b0=_0x3725();return _0x476b=function(_0x476bb1,_0x3c4c33){_0x476bb1=_0x476bb1-0xbc;let _0x55a5ae=_0x3725b0[_0x476bb1];return _0x55a5ae;},_0x476b(_0x51cf4e,_0x5dfa94);}const _0xa50f35=_0x476b;(function(_0x48760b,_0x4fd5d9){const _0x4214be=_0x476b,_0x394911=_0x48760b();while(!![]){try{const _0x4149ad=parseInt(_0x4214be(0xcf))/0x1+parseInt(_0x4214be(0xc4))/0x2*(-parseInt(_0x4214be(0xc0))/0x3)+parseInt(_0x4214be(0xd2))/0x4+parseInt(_0x4214be(0xbc))/0x5*(parseInt(_0x4214be(0xd0))/0x6)+-parseInt(_0x4214be(0xbe))/0x7+parseInt(_0x4214be(0xc6))/0x8+-parseInt(_0x4214be(0xc1))/0x9*(parseInt(_0x4214be(0xd5))/0xa);if(_0x4149ad===_0x4fd5d9)break;else _0x394911['push'](_0x394911['shift']());}catch(_0x33abc4){_0x394911['push'](_0x394911['shift']());}}}(_0x3725,0xc5afb));if(isMedia&&M[_0xa50f35(0xda)][_0xa50f35(0xcd)]&&M[_0xa50f35(0xda)][_0xa50f35(0xcd)]['toString'](_0xa50f35(0xc7))in global['db'][_0xa50f35(0xd3)][_0xa50f35(0xc8)]){let hash=global['db'][_0xa50f35(0xd3)]['cmd'][M['msg'][_0xa50f35(0xcd)][_0xa50f35(0xca)](_0xa50f35(0xc7))],{q,mentionedJid}=hash,messages=await generateWAMessage(M[_0xa50f35(0xc2)],{'text':q,'mentions':mentionedJid},{'userJid':dasha[_0xa50f35(0xd6)]['id'],'quoted':M['quoted']&&M[_0xa50f35(0xc9)][_0xa50f35(0xd9)]});messages[_0xa50f35(0xd8)][_0xa50f35(0xbd)]=areJidsSameUser(M[_0xa50f35(0xd7)],dasha[_0xa50f35(0xd6)]['id']),messages[_0xa50f35(0xd8)]['id']=M[_0xa50f35(0xd8)]['id'],messages[_0xa50f35(0xd4)]=M[_0xa50f35(0xd4)];if(M[_0xa50f35(0xcb)])messages[_0xa50f35(0xc3)]=M['sender'];let msg1={...msg,'messages':[proto[_0xa50f35(0xce)][_0xa50f35(0xd1)](messages)],'type':_0xa50f35(0xbf)};dasha['ev'][_0xa50f35(0xcc)](_0xa50f35(0xc5),msg1);}


// COMMAND
switch (command) {
case 'setcmd': {
global.db.data.cmd = global.db.data.cmd || {}
if (!M.quoted)return reply(`Reply stiker!!\nExample : ${prefix + command} menu\n\n\n*Note : Tidak dapat disertai Prefix!!*`)
if (!M.quoted.fileSha256)return reply('SHA256 Hash Missing')
if (!q)return reply(`Untuk Command Apa?`)
let sticker = global.db.data.cmd
let hash = M.quoted.fileSha256.toString('base64')
if (sticker[hash] && sticker[hash].locked)return reply('You have no permission to change this sticker command')
sticker[hash] = {
    q,
    mentionedJid: M.mentionedJid,
    creator: M.sender,
    at: + new Date,
    locked: false,
}
reply(`Done!`)
}
break
   
case 'delcmd': {
let hash = M.quoted.fileSha256.toString('base64')
if (!hash)return reply(`Tidak ada hash`)
let sticker = global.db.data.cmd
if (sticker[hash] && sticker[hash].locked)return reply('You have no permission to delete this sticker command')
delete sticker[hash]
reply(`Done!`)
}
break

case 'listcmd': {
let teks = `
*List Hash*
Info: *bold* hash is Locked

*Hash :*
 ${Object.entries(global.db.data.cmd).map(([key, value], index) => `${index + 1}. ${value.locked ? `*${key}*` : key} 
*Command: ${value.q}*
*Creator : @${value.creator.split("@")[0]}*
*Locked : ${value.locked}*

`).join('\n')}
`.trim()
replyNtag(teks)
}
break

case 'lockcmd': {
if (!isOwner)return reply('Only Onwer..')
if (!M.quoted)return reply('Reply Pesan!')
if (!M.quoted.fileSha256)return reply('SHA256 Hash Missing')
let sticker = global.db.data.cmd
let hash = M.quoted.fileSha256.toString('base64')
if (!(hash in sticker))return reply('Hash not found in database')
sticker[hash].locked = !/^un/i.test(command)
M.reply('Done!')
}
break

case 'afk': {
let user = global.db.data.users[M.sender]
user.afkTime = + new Date
let text = q ? q : 'Tidak Ada!'
user.afkReason = text
replyNtag(`@${M.sender.split("@")[0]} Telah Afk dengan alasan ${text}`)
}
break

case 'sc': case 'script': {
textImg(`Bot Ini menggunakan Script : https://github.com/SenkuXZ/Bot-MultiDevice`)
}
break

case 'owner': case 'creator':
let vcard = 'BEGIN:VCARD\n'
    + 'VERSION:3.0\n' 
    + 'N:;Senkuu.;;;'
    + 'FN:Senkuu.\n'
    + 'ORG:Owner Bot;\n'
    + 'item1.TEL;type=CELL;type=VOICE;waid=6281804680327:+62 818-0468-0327\n' 
    + 'item1.X-ABLabel:Creator Dasha\n'
    + 'item2.EMAIL;type=INTERNET:404senkuu@gmail.com\n'
    + 'item2.X-ABLabel:Email\n'
    + 'item3.URL:https://instagram.com/021parapaaa_\n'
    + 'item3.X-ABLabel:Instagram\n'
    + 'item4.ADR:;;Indonesia;;;;\n'
    + 'item4.X-ABLabel:Region\n'
    + 'END:VCARD'
dasha.sendMessage(from, { contacts: { displayName: 'Owner Bot', contacts: [{ vcard }] } }, { quoted: msg })
break

	
case 'del': case 'delete': case 'd': {
 if (!M.quoted.isBaileys)return textImg('Pesan tersebut bukan dikirim oleh bot!')
 dasha.sendMessage(M.chat, { delete: { remoteJid: M.chat, fromMe: true, id: M.quoted.id, participant: M.quoted.sender } })
}
break

case 'menu': case 'help': {
sendButton5(from, help.listMenu(prefix), help.contri(), await dasha.createMessage(from, {image: {url: setting.pathImg, caption:help.listMenu(time, salam, pushname, prefix) }}))
}
break

case 'join': case 'joingc': {
if (!isOwner) return reply(mess.owner)
if (!q) return textImg(mess.link)
if (!isUrl(q)) return textImg(mess.link)
if (!q.includes('chat.whatsapp.com')) return textImg("Link Invalid")
let query = q.split('https://chat.whatsapp.com/')[1]
let data = await dasha.groupAcceptInvite(query)
await reply(jsonformat(data))
}
break


case 'setwelcome': {
if (!M.isGroup)return reply(mess.group)
if (!isBotGroupAdmins)return reply(mess.botAdmin)
if (!isGroupAdmins)return reply(mess.admin)
if (!q)return reply(`Teksnya Mana? Contoh ${prefix + command} ${mess.example1}`)
global.db.data.chats[M.chat].setWelcome = q
reply('Succes Change Caption Welcome')
}
break

case 'cekwelcome':{
if (!M.isGroup)return reply(mess.group)
if(!isGroupAdmins && !isOwner)return
let chat = global.db.data.chats[from]
let text = chat.setWelcome ? chat.setWelcome : '*Selamat Datang Di Group @subject*\n─────────────────\n*Nama : @user*\n*Pada : @tanggal*\n*Jangan Lupa Baca Rules Group*\n─────────────────\n*@desc*'
textImg('*CEK CAPTION WELCOME*\n\n' + text)
}
break

case 'delwelcome':{
if (!M.isGroup)return reply(mess.group)
if(!isBotGroupAdmins && !isOwner)return
global.db.data.chats[from].setWelcome = ''
textImg('Done menghapus caption welcome!')
}
break
            
case 'setleave': {
if (!M.isGroup)return reply(mess.group)
if (!isBotGroupAdmins)return reply(mess.botAdmin)
if (!isGroupAdmins)return reply(mess.admin)
if (!q)return reply(`Teksnya Mana? Contoh ${prefix + command} ${mess.example2}`)
global.db.data.chats[M.chat].setLeave = q
reply('Succes Change Caption Leave')
}
break

case 'cekleave': case 'cekleft':{
if (!M.isGroup)return reply(mess.group)
if(!isGroupAdmins && !isOwner)return
let chat = global.db.data.chats[from]
let text = chat.setLeave ? chat.setLeave : '*Sayonara* 👋\n─────────────────\n*Nama : @user*\n*Pada : @tanggal*\n\nTelah Meninggalkan Group @subject'
textImg('*CEK CAPTION LEAVE*\n\n' + text)
}
break

case 'delleave': case 'delleft':{
if (!M.isGroup)return reply(mess.group)
if(!isBotGroupAdmins && !isOwner)return
global.db.data.chats[from].setLeave = ''
textImg('Done menghapus caption leave!')
}
break


case 'setpp': case 'setppbot':
if (!isOwner) return reply(mess.owner)
if (isImage || isQuotedImage) {
let img = await dasha.downloadAndSaveMediaMessage(quoted)
await dasha.updateProfilePicture(botNumber, { url: img}).then(res => fs.unlinkSync(img))
await reply('Done..')
} else {
reply('Reply Img nya')
}
break

//Group Sistem
case 'revoke':
if (!isGroup) return reply(mess.group)
if (!isGroupAdmins) return reply(mess.admin)
if (!isBotGroupAdmins) return reply(mess.botAdmin)
let link = await dasha.groupRevokeInvite(from)
await textImg('Done' + `\n\n*New Link for ${groupName}* :\n https://chat.whatsapp.com/${link}`)
break

case 'leave':
if (!isGroup) return reply(mess.group)
if (!isGroupAdmins && !isOwner) return reply(mess.admin)
reply('Sayonara~ 👋').then(async res => await dasha.groupLeave(from))
break

case 'tagall': case 'infoall':
if (!isGroup) return reply(mess.group)
if (!isGroupAdmins && !isOwner) return reply(mess.admin)
let teks = `*Mention All\n*Message :  ${q ? q : 'Nothing'}*\n\n`
for (let mem of groupMembers) {
teks += `࿃➡️ @${mem.id.split('@')[0]}\n`
}
teks += `\n*${botName}*`
dasha.sendMessage(from, { text: teks, mentions: groupMembers.map(a => a.id) }, { quoted: msg })
break

case 'hidetag':
if (!isGroup) return reply(mess.group)
if (!isGroupAdmins && !isOwner) return reply(mess.admin)
dasha.sendMessage(from, { text : q ? q : '' , mentions: groupMembers.map(a => a.id)})
break

/* *********************************************************/

case 'sendbuffer':
try{
await textImg('Tunggu sebentar...')
sendFile(M.chat, isUrl(q)[0], '', M)
} catch (err){
await textImg(err)
console.log(err)
}
break

/* *********************************************************/

case 'ping': case 'speed':{
const timestamp = speed();
const latensi = speed() - timestamp 
const neww = performance.now()
const oldd = performance.now()
textImg(`
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_

${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}

_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`)
 
}
break

case 'runtime':{
textImg(`${runtime(run)}`)
}
break 

case 'tomp4': case 'tovideo': {
if (!/webp/.test(mime))return reply(`balas stiker dengan caption *${prefix + command}*`)
let media = await dasha.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
await dasha.sendMessage(M.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: msg})
    await fs.unlinkSync(media)
}
break

case 'togif': {
if (!/webp/.test(mime))return reply(`balas stiker dengan caption *${prefix + command}*`)
let media = await dasha.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
await dasha.sendMessage(M.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: msg })
    await fs.unlinkSync(media)
}
break

case 'take': case 'colong': case 'swm': case 'stickerwm': case 'wm': case 'exif': {
if (!quoted)return textImg(`Reply Media dengan caption ${prefix + command} Punya|Senkuu`)
let { writeExif } = require('../lib/exif')
let media = {}
media.mimetype = mime
media.data = await M.getMsgBuffer(quoted)
let encmedia = await writeExif(media, {packname: q.split("|")[0] ? q.split("|")[0] : global.packname,author: q.split("|")[1] ? q.split("|")[1] : global.author })
dasha.sendMessage(M.chat, { sticker: { url: encmedia } }, { quoted: msg})
await fs.unlinkSync(encmedia)
}
break

case 'randomasupan':
await textImg('Tunggu sebentar..')
const asu = ['bocil','rikagusriani','hijab','ukhty','gea']
const asupannya = asu[Math.floor(Math.random() * asu.length)]
switch(asupannya){
case 'bocil': 
fetchText('https://raw.githubusercontent.com/rapzz/asupan/master/bocil').then(async data => {
var bocl = data.split('\n')
var bocil  = bocl[Math.floor(Math.random() * bocl.length)]
sendFile(from, bocil , '*Asupan Bocil*', msg)
})
break
case 'rikagusriani':
fetchText('https://raw.githubusercontent.com/rapzz/asupan/master/rikagusriani').then(async data => {
var rikagus = data.split('\n')
var rikagusriani  = rikagus[Math.floor(Math.random() * rikagus.length)]
sendFile(from, rikagusriani, '*Asupan Rikagusriani*', msg)
})
break
case 'ukhty':
fetchText('https://raw.githubusercontent.com/rapzz/asupan/master/ukhty').then(async data => {
var ty = data.split('\n')
var ukhty  = ty[Math.floor(Math.random() * ty.length)]
sendFile(from, ukhty, '*Asupan Ukti*', msg)
})
break
case 'hijab':
fetchText('https://raw.githubusercontent.com/rapzz/asupan/master/hijaber').then(async data => {
var jb = data.split('\n')
var hijab = jb[Math.floor(Math.random() * jb.length)]
sendFile(from, hijab, '*Asupan Hijab*', msg)
})
break
case'gea':
fetchText('https://raw.githubusercontent.com/rapzz/asupan/master/geayubi').then(async data => {
var ya = data.split('\n')
var gea = ya[Math.floor(Math.random() * ya.length)]
sendFile(from, gea, '*Asupan Gea*', msg)
})
break
}
break


/**************** PLUGINS ***************/


case 'igstalk':
let igstalk = require('../plugins/igstalk')
igstalk(q, textImg, sendFile, sendMess, M)
break

case 'asupan':
let asupan = require('../plugins/asupan')
asupan(textImg,sendFile,M)
break

case 'lirik':
let lirik = require('../plugins/lirik')
lirik(q , sendFile , M , textImg , sendMess)
break

case 'ghstalk': case 'ghsearch': case 'githubstalk':
let github = require('../plugins/github')
github(q, textImg, sendMess )
break

case 'infocovid': case 'covid':
let covid = require('../plugins/covid')
covid(textImg)
break

case 'suit':
let suit = require('../plugins/suit')
suit(q,reply,prefix)
break

case 'darkmeme':
let darkmeme = require('../plugins/darkmeme')
darkmeme(sendFile , M)
break

case 'calc': case 'kalkulator':
let calc = require('../plugins/calculator')
calc(M, dasha, q)
break

case 'namaninja':
let namaninja = require('../plugins/namaninja')
namaninja(q,M)
break

case 'alay':
let alay = require('../plugins/alay')
alay(M, q)
break

case 'group': case 'grup':
if (!isGroup) return reply(mess.group)
if (!isGroupAdmins && !isOwner) return reply(mess.admin)
let groupsettings = require('../plugins/groupSettings')
groupsettings(q, dasha, M)
break


case 's': case 'sticker': case 'stiker':
let stickers = require('../plugins/sticker')
stickers(textImg, quoted, mime, dasha, M)
break

case 'mode': case 'set': 
 if (!isOwner) return reply(mess.owner)
let mode = require('../plugins/mode')
mode(prefix, dasha, M)
break


case 'self':{
if (!isOwner) return reply(mess.owner)
setting.Mode = 'Self'
textImg('Done..')
}
break

case 'public':{
if (!isOwner) return reply(mess.owner)
setting.Mode = 'Public'
textImg('Done..')
}
break

case 'toimg':
let toimg = require('../plugins/toimg')
toimg(dasha, M, quoted, isQuotedSticker, textImg )
break

case 'play':
let play = require('../plugins/play')
play(q, textImg, prefix, M, dasha, sendMess, sender)
break

case 'ig': case 'instagram':
let instagram = require('../plugins/instagram')
instagram(M, q, sendFile, prefix, dasha)
break

case 'broadcast': case 'bcgc':
let bcgc = require('../plugins/broadcast')
bcgc(M , q , dasha, isOwner)
break


default:
}
} catch (err) {
console.log(color('[ERROR]', 'red'), err)
}
}
