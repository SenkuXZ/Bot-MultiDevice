require('../message/config')

let darkmeme = async(sendFile , M) =>{
sendFile(M.chat, api('anto','/api/darkmeme', {}, 'apikey'), '*_Gelap.._*', M)
}

module.exports = darkmeme
