let { fetchJson } = require('../lib/myfunc')
let fs = require('fs')
let setting = JSON.parse(fs.readFileSync('./config.json'))
require('../message/config')


let lirik = async(q , sendFile , M , textImg , sendMess) => {
if(!q)return textImg('Nama lagu nya mana?')
fetchJson(api('https://some-random-api.ml', '/lyrics', { title: q})).then(async data => {
sendFile(M.chat ,data.thumbnail.genius, data.lyrics, M)
}).catch((err) => {
for (let x of setting.ownerNumber) {
sendMess(x, `*[ Lirik Error ]*  \n\n` + err)
}
textImg('Error!')
})
}

module.exports = lirik
