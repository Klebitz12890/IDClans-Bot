let handler = async (m, { text }) => {
  let user = db.data.users[m.sender]
  user.afk = + new Date
  user.afkReason = text
  m.reply(`
${user ? user.name : conn.getName(m.sender)} sekarang AFK${text ? ': ' + text : ''}
`)
}
handler.help = ['afk [alasan]']
handler.tags = ['other']
handler.command = /^afk$/i

module.exports = handler
