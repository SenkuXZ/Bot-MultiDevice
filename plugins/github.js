let fs = require('fs')
let { fetchJson } = require('../lib/myfunc')
require('../message/config')
let setting = JSON.parse(fs.readFileSync('./config.json'))


function formatDate(n, locale = 'id') {
let d = new Date(n)
return d.toLocaleDateString(locale, {
weekday: 'long',
day: 'numeric',
month: 'long',
year: 'numeric',
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
}
  
  
let github = async(q, textImg, sendMess ) =>{
if(!q)return textImg('Username nya mana?')
 fetchJson(api('https://api.github.com', '/search/repositories', {
  q: q
    })).then(async i => {
let tex = i.items.map((repo, index) => {
  return `
${1 + index}. *${repo.full_name}*${repo.fork ? ' (fork)' : ''}
_${repo.html_url}_
_Dibuat pada *${formatDate(repo.created_at)}*_
_Terakhir update pada *${formatDate(repo.updated_at)}*_
👁  ${repo.watchers}   🍴  ${repo.forks}   ⭐  ${repo.stargazers_count}
${repo.open_issues} Issue${repo.description ? `
*Deskripsi:*\n${repo.description}` : ''}
*Clone:* \`\`\`$ git clone ${repo.clone_url}\`\`\`
`.trim()
    }).join('\n\n')
    textImg(tex)
}).catch((err) => {
for (let x of ownerNumber) {
sendMess(x, `*[ GithubStalk Error ]*  \n\n` + err)
}
textImg('Error!')
})
}

module.exports = github
