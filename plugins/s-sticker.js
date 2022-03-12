const { sticker } = require('../lib/sticker')

let handler = async (m, { conn }) => {
    let stiker = false
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (/webp/.test(mime)) {
            let img = await q.download()
            stiker = await sticker(img, false, packname, author)
        } else if (/image/.test(mime)) {
            let img = await q.download()
            stiker = await sticker(img, false, packname, author)
        } else if (/video/.test(mime)) {
            if ((q.msg || q).seconds > 11) return m.reply('maks 10 detik!')
            let img = await q.download()
            stiker = await sticker(img, false, packname, author)
        } else if (m.quoted.text) {
            if (isUrl(m.quoted.text)) stiker = await sticker(false, text, packname, author)
            else throw 'URL tidak valid! akhiri dengan jpg/gif/png'
        }
    } catch (e) {
        throw e
    }
    finally {
        if (stiker) await conn.sendFile(m.chat, stiker, '', '', m)
        else {
            await conn.sendButton(m.chat, `balas medianya!`, wm, 'aktifkan stiker otomatis', '.1 s', m)
            throw 0
        }
    }
}
handler.help = ['stiker']
handler.tags = ['other']
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i

module.exports = handler

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'))
}