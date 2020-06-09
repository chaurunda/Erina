module.exports = {
	name: 'prune',
	description: 'Efface des messages',
	permission: true,
	execute(message, args) {
		const amount = parseInt(args[0]) + 1

		if (isNaN(amount)) {
			return message.reply("Ce n'est pas un nombre valide.")
		} else if (amount <= 1 || amount > 100) {
			return message.reply('un nombre entre 1 et 99 est recquis')
		}

		message.channel.bulkDelete(amount, true).catch((err) => {
			console.error(err)
			message.channel.send(
				'Il y a un probleme en voulant supprimer les messages!',
			)
		})
	},
}
