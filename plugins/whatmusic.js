let FormData = require('form-data') 
let axios = require('axios') 
 
let whatmusic = async(M) =>{
  let q = M.quoted ? M.quoted : m 
  let mime = (M.quoted ? M.quoted : M.msg).mimetype || '' 
  if (!/video|audio/.test(mime))return M.reply(`Balas music yang ingin dicari dengan caption *!whatmusic*`)
  M.reply('Wait Ngap, Lagi Cari....') 				
  const bodyForm = new FormData() 			 
  bodyForm.append('audio', await q.download(), 'music.mp3')
  bodyForm.append('apikey', 'DashaBotWa') 			
  axios('https://api.zeks.me/api/searchmusic', { 		
    method: 'POST', 		
    headers: { 				
      "Content-Type": "multipart/form-data", 			
      ...bodyForm.getHeaders() 		
      
    }, 		
    data: bodyForm 			
    }) .then(({data}) =>{ 				 
      M.reply(`*Lagu Ditemukan!*\n\n*Judul* : ${data.data.title}\n*Artist* : ${data.data.artists}\n*Genre* : ${data.data.genre}\n*Album* : ${data.data.album}\n*Release* : ${data.data.release_date}`)
      }).catch(() => { 				
        M.reply('Lagu Tidak Ditemukan!\nLu Nyari DJ Remix ya?') 				}) 				 
}

module.exports = whatmusic


