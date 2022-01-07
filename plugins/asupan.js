require('../message/config')

let asupan = async(textImg,sendFile,M) => {
try{
await textImg('Tunggu Sebentar..')
sendFile(M.chat,api('amel','/asupan',{},'apikey'),'*Jangan lupa kocok tuh batang :v*',M)
} catch (err){
console.log(err)
textImg(err)
} 
}

module.exports = asupan
