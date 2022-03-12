let handler = async (m, { conn, participants }) => {
  if (!db.data.settings[conn.user.jid].restrict) return await conn.sendButton(m.chat, 'info: if used too often, the number will be banned', wm, 'On Restrict', '.on restrict', m)
  if (m.quoted) {
    await conn.groupDemoteAdmin(m.chat, [m.quoted.sender]).catch(console.log)
  }
  let members = participants.filter(member => member.isAdmin).map(member => member.jid)
  let users = m.mentionedJid.filter(user => members.includes(user))
  for (let user of users) await conn.groupDemoteAdmin(m.chat, [user]).catch(console.log)
}
handler.help = ['demote'].map(v => v + ' @user')
handler.tags = ['admin']
handler.command = /^(demote)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

module.exports = handler
