let fs = require('fs')
let setting = JSON.parse(fs.readFileSync('./config.json'))

let stickers = async(textImg, quoted, mime, conn, M) => {
if (!quoted)return textImg(`Balas Video/Image Dengan Caption !sticker`)
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await conn.sendImageAsSticker(M.chat, media, M, { packname: setting.packname, author: setting.author })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return reply('Maksimal 10 detik!')
let media = await quoted.download()
let encmedia = await conn.sendVideoAsSticker(M.chat, media, M, { packname: setting.packname, author: setting.author })
await fs.unlinkSync(encmedia)
} else {
textImg(`Kirim Gambar/Video Dengan Caption !sticker \nDurasi Video 1-9 Detik`)
}
}

module.exports = stickers
