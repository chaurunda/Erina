const fs = require('fs')

exports.run = (client, message, args) => {
	console.log('message', message.author.id)
	console.log('client', client.config.ownerID)
	if (message.author.id !== client.config.ownerID) return

	let newPrefix = args.shift()

	if (undefined === newPrefix) return

	client.config.prefix = newPrefix
	fs.writeFile(
		'./config.json',
		JSON.stringify(client.config),
		(err) => console.error,
	)
	message.channel.send('Le nouveau préfixe est `' + client.config.prefix + '`.')
}

exports.conf = {
	enabled: true,
	aliases: [],
	permLevel: 'User',
}

exports.help = {
	name: 'prefix',
	category: 'Miscelaneous',
	description: 'Permet le changement du prefix du bot.',
	usage: 'prefix <prefix>',
}
