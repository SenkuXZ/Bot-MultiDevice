const axios = require("axios")  
const { getBuffer , tanggal } = require("../lib/myfunc");

module.exports = async(dasha, anu) => {
try{
  
let metadata = await dasha.groupMetadata(anu.id)
let participants = anu.participants

for (let num of participants) {

try {
ppuser = await dasha.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://telegra.ph/file/78757a3eb7a7da1a3cdb7.jpg'
}

let shortpc = await axios.get(`https://tinyurl.com/api-create.php?url=${ppuser}`)

let chat = global.db.data.chats[anu.id] || {}

if (anu.action == 'add') {
let teks = (chat.setWelcome || '*Selamat Datang Di Group @subject*\n─────────────────\n*Nama : @user*\n*Pada : @tanggal*\n*Jangan Lupa Baca Rules Group*\n─────────────────\n@desc').replace(/@subject/g, metadata.subject).replace(/@user/g, `@${num.split('@')[0]}`).replace(/@tanggal/g, `${tanggal(new Date())}`).replace(/@desc/g, `${metadata.desc}`)
dasha.sendMessage(anu.id, { image: await getBuffer(`https://hardianto.xyz/api/welcome4?profile=${shortpc.data}&name=${num.split("@")[0]}`), caption: teks, mentions : [num]})
} else if (anu.action == 'remove') {
let teks = (chat.setLeave || '*Sayonara* 👋\n─────────────────\n*Nama : @user*\n*Pada : @tanggal*\n\nTelah Meninggalkan Group @subject').replace(/@subject/g, metadata.subject).replace(/@user/g, `@${num.split('@')[0]}`).replace(/@tanggal/g, `${tanggal(new Date())}`).replace(/@desc/g, `${metadata.desc}`)
dasha.sendMessage(anu.id, { image: await getBuffer(`https://hardianto.xyz/api/goodbye4?profile=${shortpc.data}&name=${num.split("@")[0]}`), caption: teks, mentions : [num]})
}
}  
}catch (e) {
console.log(e)
}
}
