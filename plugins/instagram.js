let { fetchJson } = require("../lib/myfunc");
let instagram = async(M, q, sendFile, prefix, conn) =>{
try {
if(!q)return M.reply(`Example : ${prefix}ig https://www.instagram.com/reel/CSzYx-chQ1u/?utm_source=ig_web_copy_link`)
if (!q.includes('instagram.com')) return M.reply('Bukan link IG itu..')
fetchJson(api('anto','/api/instagram', {url:q})).then(async i =>{
let txt = '*Instagram Downloader*\n\n'
txt += 'Username : ' + i.username + '\n'
txt += 'Fullnane : ' + i.fullname + '\n'
txt += 'Duration : ' + i.duration + '\n'
txt += 'Like : ' + i.like + '\n'
txt += 'Comment : ' + i.comment + '\n'
txt += 'Views : ' + i.view + '\n'
txt += 'Caption : ' + i.caption
sendFile(M.chat, i.url, txt, M)
})
}catch (err){
console.log(err)
M.reply('Error')
}
}

module.exports = instagram
