require('../message/config.js')
let fs = require('fs')
let { getBuffer, fetchJson, fetchText, getRandom } = require("../lib/myfunc");
let setting = JSON.parse(fs.readFileSync('./config.json'))

let play = async(q, textImg, prefix, M, conn, sendMess, sender) => {
try{
if(!q)return textImg(`Example : ${prefix}play payung teduh`)
await textImg('Tunggu sebentar..')
let play1 = await fetchJson('https://api.zeks.me/api/ytplaymp3?apikey=DashaBotWa&q=' + q)
let play2 = await fetchJson('https://api.zeks.me/api/ytplaymp4?apikey=DashaBotWa&q=' + q)
let txwoi = '*PLAY*\n\n'
txwoi += ' • Judul : ' + play1.result.title + '\n'
txwoi += ' • Url Audio : ' + play1.result.url_audio + '\n'
txwoi += ' • Url Video : ' + play2.result.url_video + '\n'
txwoi += ' • Size Audio : ' + play1.result.size + '\n'
txwoi += ' • Size Video : ' + play2.result.size + '\n'
txwoi += ' • Duration : ' + play1.result.duration + '\n'
txwoi += ' • Source : ' + play1.result.source

const ttes = [
 {buttonId: `${prefix}sendbuffer ${play1.result.url_audio}`, buttonText: {displayText: `Audio ( ${play1.result.size} )`}, type: 1}, 
 {buttonId: `${prefix}sendbuffer ${play2.result.url_video}`, buttonText: {displayText: `Video ( ${play2.result.size} )`}, type: 1} ] 
const buttontes = {
image: {url: play2.result.thumbnail}, 
caption: txwoi, 
footerText: 'Get Music or Video', 
buttons: ttes, 
headerType: 4 
} 
conn.sendMessage(M.chat, buttontes,{quoted : M})
} catch (err) {
console.log(err)
await textImg('Error')
}
}

module.exports = play
