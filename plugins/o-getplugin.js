let handler = async (m, { usedPrefix, command, text }) => {
    let ar = Object.keys(plugins)
    let ar1 = ar.map(v => v.replace('.js', ''))
    if (!text) throw `uhm.. teksnya mana?\n\ncontoh:\n${usedPrefix + command} i-info`
    if (!ar1.includes(text)) return m.reply(`'${text}' tidak ditemukan!\n\n${ar1.map(v => ' ' + v).join`\n`}`)
    m.reply(require('fs').readFileSync('./plugins/' + text + '.js', 'utf-8'))
}
handler.help = []
handler.tags = []
handler.command = /^(getplugin|gp)$/i

handler.rowner = 1

module.exports = handler