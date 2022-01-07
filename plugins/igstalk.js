let fs = require('fs')
let { fetchJson } = require('../lib/myfunc')
require('../message/config')
let setting = JSON.parse(fs.readFileSync('./config.json'))


let igstalk = async(q, textImg, sendFile, sendMess, M) =>{
if(!q)return textImg('Username nya mana?')
fetchJson(api('anto','/api/igstalk',{username: q},'apikey')).then(async i =>{
let woi = `*𝙄𝙉𝙎𝙏𝘼𝙂𝙍𝘼𝙈 𝙎𝙏𝘼𝙇𝙆𝙀𝙍*

_Username : ${i.username}_
_Nickname : ${i.fullname}_
_Source : https://instagram.com/${q}_
_Verified : ${i.verified}_
_Followers : ${i.followers}_
_Following : ${i.follow}_
_Categori : ${i.category}_
_Bio : ${i.bio}_`
sendFile(M.chat ,i.thumbnail,woi, M)
}).catch((err) => {
for (let x of ownerNumber) {
sendMess(x, `*[ IgStalk Error ]*  \n\n` + err)
}
textImg('Error!')
})
}


module.exports = igstalk
