const BlaguesAPI = require('blagues-api')
const { blagueToken } = require('../config.json')
const blagues = new BlaguesAPI(blagueToken)

module.exports = {
	name: 'blague',
	description: 'Je te raconte une blague',
	aliases: ['blague'],
	execute(message) {
		try {
			async function getBlague() {
				return await blagues.random({
					disallow: [blagues.categories.DARK, blagues.categories.LIMIT],
				})
			}
			getBlague().then((blague) => {
				console.log(blague)
				if (!message.mentions.users.size) {
					message.channel.send(blague.joke)
					return message.channel.send(blague.answer)
				}

				const joke = message.mentions.users.map((user) => {
					return blague.joke
				})
				message.channel.send(joke)

				const answer = message.mentions.users.map((user) => {
					return blague.answer
				})
				message.channel.send(answer)
			})
		} catch (error) {
			console.log(error)
		}
	},
}
