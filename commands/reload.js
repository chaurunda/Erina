module.exports = {
	name: 'reload',
	description: 'Relance une commande',
	args: true,
	permission: true,
	execute(message, args) {
		const commandName = args[0].toLowerCase()
		const command =
			message.client.commands.get(commandName) ||
			message.client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName),
			)

		if (!command) {
			return message.channel.send(
				`Il n'y a aucune commande \`${commandName}\`, ${message.author}!`,
			)
		}

		delete require.cache[require.resolve(`./${command.name}.js`)]

		try {
			const newCommand = require(`./${command.name}.js`)
			message.client.commands.set(newCommand.name, newCommand)
			message.channel.send(`Le commande \`${command.name}\` a été relancée!`)
		} catch (error) {
			console.log(error)
			message.channel.send(
				`Il y a eu un soucis en voulant recharger \`${command.name}\`:\n\`${error.message}\``,
			)
		}
	},
}
