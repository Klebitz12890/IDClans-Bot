let handler = async (m, { conn, isOwner, text, isAdmin }) => {
  let who
  if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
      dfail('owner', m, conn)
      throw false
    }
    if (isOwner) who = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
    else who = m.chat
  } else {
    if (!isOwner) {
      dfail('owner', m, conn)
      throw false
    }
    who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
  }
  try {
    if (who.endsWith('g.us')) db.data.chats[who].isBanned = false
    else db.data.users[who].banned = false
    m.reply(`berhasil unban ${conn.getName(who) == undefined ? who : conn.getName(who)}`)
  } catch (e) {
    throw `tidak ada didatabase!`
  }
}
handler.help = ['unban']
handler.tags = ['admin']
handler.command = /^(ub|unban)$/i

handler.admin = true

module.exports = handler