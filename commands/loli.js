module.exports = {
	name: 'loli',
	description: 'uwu',
	aliases: ['loli'],
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send('UwU')
		}

		const avatarList = message.mentions.users.map((user) => {
			return 'UwU'
		})

		message.channel.send(avatarList)
	},
}
