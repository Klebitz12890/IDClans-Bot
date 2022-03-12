let handler = function (m, { isAdmin, isOwner }) {
  if (!m.quoted) throw false
  let { chat, fromMe, id, isBaileys } = m.quoted
  if (!fromMe) throw false
  if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
      global.dfail('admin', m, conn)
      throw false
    }
  }
  if (!isBaileys) throw 'pesan itu tidak dikirim oleh bot!'
  this.deleteMessage(chat, {
    fromMe,
    id,
    remoteJid: chat
  })
}
handler.help = []
handler.tags = []

handler.command = /^del(ete)?$/i

module.exports = handler