let googleIt = require('google-it')

let google = async(M, conn, fetchJson, sendFile, prefix, command, q) => {
let full = /f$/i.test(command)
if (!q)return M.reply(`uhm.. cari apa?\n\ncontoh:\n${prefix + command} Bahasa pemrograman`)
let url = 'https://google.com/search?q=' + encodeURIComponent(q)
let search = await googleIt({ query: q })
let mess = search.map(({ title, link, snippet }) => {
return `*${title}*\n_${link}_\n_${snippet}_`
}).join`\n\n`
try {
sendFile(M.chat, api('amel','/ssweb',{url:'https://google.com/search?q=' + q},'apikey'), url + '\n\n' + mess, M )

} catch (e) {
M.reply(mess)
}
}

module.exports = google
