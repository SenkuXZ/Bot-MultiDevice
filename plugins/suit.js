let suit = async(q,reply,prefix) =>{
const pilihan = ['batu', 'gunting', 'kertas']
const Case = str => str[0].toUpperCase() + str.slice(1).toLowerCase()
 let salah = `Pilihan yang tersedia Gunting, Kertas, Batu\n\n*Contoh* : ${prefix}suit gunting\n`
    if (!q)return reply(salah)
    if (!pilihan.includes(q.toLowerCase()))return reply(salah)
    let suitP1 = pilihan.indexOf(q.toLowerCase())
    let suitPC = Math.floor(Math.random() * 3)
    let kamu = Case(pilihan[suitP1])
    let bot = Case(pilihan[suitPC])
    let state = `Kamu: ${kamu}\nBot: ${bot}`
    if (suitP1 === suitPC) {
        reply(`*Kita Seri*\n\n${state}`)
    } else if ((suitP1 + 1) % 3 === suitPC) {
        reply(`*Kamu Menang*\n\n${state}`)
    } else if ((suitP1 - 1) % 3 === suitPC) {
        reply(`*Kamu Kalah*\n\n${state}`)
    } else reply('Terjadi kesalahan')
}

module.exports = suit
