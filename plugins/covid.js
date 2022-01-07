let { fetchJson } = require('../lib/myfunc')
require('../message/config')

let covid = async( textImg ) => {
fetchJson(api('anto','/api/info/covid',{},'apikey')).then(async data =>{
for(let i of data){
let copit =`*𝘾𝙊𝙑𝙄𝘿 𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝙏𝙄𝙊𝙉*

*Indonesia*
  » Positif : ${i.indo.positif_indo}
  » Meninggal : ${i.indo.meninggal_indo}
  » Sembuh : ${i.indo.sembuh_indo}
  » Last Update : ${i.indo.update_indo}

*Global*
  » Total Negara : ${i.global.negara}
  » Positif : ${i.global.positif}
  » Meninggal : ${i.global.meninggal}
  » Last Update : ${i.global.update}
`.trim()
return textImg(copit)
}
})
}

module.exports = covid
