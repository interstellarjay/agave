const chalk = require('chalk')
const emoji = require ('node-emoji')

// Add color and emoji to console output
const Log = {
    General: function (bgColor, textColor, text) {
        let _bgColor    = bgColor   || 'bgBlack'
        let _text       = text      || ''
        let _textColor  = textColor || 'white'
        return console.log(chalk[`${_bgColor}`](chalk[`${_textColor}`](_text)))
    },
    Info: function (text) {
        let _text       = text || ''
        let _textColor  = 'cyan'
        return console.log(chalk[`${_textColor}`]('\n(!) ' + _text + '\n'))
    },
    Success: function ChalkSuccess () {
        return this.General(null, 'cyan',`${emoji.get('honey_pot')}${emoji.get('white_check_mark')} component created successfully.\n`)
    },
    Logo: function () {
        return this.General('bgGreenBright', 'black', `${emoji.get('honey_pot')} ${emoji.get('herb')} ~ Agave CLI ~ ${emoji.get('herb')} ${emoji.get('honey_pot')} `)
    },    
    Error: function (err) {
        return this.General(null, 'white',`${emoji.get('x')}  ${err}`)
    },
}

module.exports = Log