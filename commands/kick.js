module.exports = {
	name: 'kick',
	description: 'Tag un membre et kick le (enfin presque).',
	usage: '<user>',
	guildOnly: true,
	permission: true,
	execute(message) {
		if (!message.mentions.users.size) {
			return message.reply(
				'Tu dois taguer un utilisateur pour pouvoir le kick!',
			)
		}

		const taggedUser = message.mentions.users.first()

		message.channel.send(`Tu veux kick: ${taggedUser.username}`)
	},
}
