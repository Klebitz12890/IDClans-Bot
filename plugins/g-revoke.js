let handler = async (m, { conn }) => {
  let res = await conn.revokeInvite(m.chat)
  conn.reply(m.sender, 'https://chat.whatsapp.com/' + res.code)
}
handler.help = []
handler.tags = []
handler.command = /^(resetlink)?$/i

handler.group = true
handler.admin = true
handler.botAdmin = true

module.exports = handler