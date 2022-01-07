let mode = async(prefix, conn, M) =>{
const buttons = [
{buttonId: `${prefix}self`, buttonText: {displayText: '</Self'}, type: 1},
{buttonId: `${prefix}public`, buttonText: {displayText: '</Public'}, type: 1}
]

const buttonMessage = {
text: "Pilih Salah Satu",
footerText: 'Hello Owner',
buttons: buttons,
headerType: 1
}
conn.sendMessage(M.chat, buttonMessage)
}

module.exports = mode
