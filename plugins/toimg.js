let fs = require('fs')
let { exec, spawn } = require("child_process");
let { webp2mp4File } = require('../lib/uploader')
let {  getRandom } = require("../lib/myfunc");

let toimg = async(conn, M, quoted, isQuotedSticker, textImg ) => {
if (isQuotedSticker) {
let media = await conn.downloadAndSaveMediaMessage(quoted)
if (M.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated) {
let mediaw = await conn.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(mediaw)
await conn.sendMessage(M.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: M})
await fs.unlinkSync(mediaw)
} else {
await textImg('Tunggu sebentar..')
let ran = getRandom('.png')
exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
fs.unlinkSync(media)
if (err) return textImg('Gagal :V')
await conn.sendMessage(M.chat, { image: fs.readFileSync(ran), caption: 'Done..' }, { quoted: M }).then(res => fs.unlinkSync(ran))
})
}
} else {
textImg('Reply stiker nya..')
}
}

module.exports = toimg
