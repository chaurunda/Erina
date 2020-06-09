module.exports = {
	name: 'user-info',
	description: 'Send user info',
	execute(message, args) {
		message.channel.send(
			`Ton nom: ${message.author.username}\nTon ID: ${message.author.id}`,
		)
	},
}
