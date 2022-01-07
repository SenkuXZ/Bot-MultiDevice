const chalk = require('chalk')

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

const DashaLog = (text, color) => {
	return !color ? chalk.yellow('[Dasha] ') + chalk.green(text) : chalk.yellow('[Dasha] ') + chalk.keyword(color)(text)
}

module.exports = {
	color,
	bgcolor,
    DashaLog
}
