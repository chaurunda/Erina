module.exports = {
	name: 'server',
	description: 'Sent server informations',
	execute(message, args) {
		message.channel.send(
			`Nom du server: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`,
		)
	},
}
