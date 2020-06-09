module.exports = {
	name: 'avatar',
	description: "Récupère l'avatar des personnes taguées ou de ton avatar",
	aliases: ['icon', 'pfp'],
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(
				`Voici l'url de ton avatar: <${message.author.displayAvatarURL({
					dynamic: true,
				})}>`,
			)
		}

		const avatarList = message.mentions.users.map((user) => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({
				dynamic: true,
			})}>`
		})

		message.channel.send(avatarList)
	},
}
