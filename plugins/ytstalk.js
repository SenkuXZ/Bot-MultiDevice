let user = require('yt-search')

let ytstalk = async(M, sendFile, q) =>{
try{
if (!q)return M.reply(`Masukan parameter, Contoh *#ytstalk gustixa*`)
M.reply('Sedang di proses kak:D')
let { image, subCount, subCountLabel, videoCount, name } = (await user(q)).channels[0]
let hasil = `*YouTube Stalk*

*Name* : ${name}
*Subscribers* : ${subCount} *( ${subCountLabel} )*
*Count* : ${videoCount} Video

© Senkuu`
sendFile(M.chat, image, hasil, M)
} catch (err) {
console.log(err)
M.reply(err)
}

}

module.exports = ytstalk
