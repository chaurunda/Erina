module.exports = {
	name: 'my-permission',
	description: 'Affiche toutes les permissions que tu as',
	permission: true,
	execute(message, args) {
		const finalPermissions = message.channel.permissionsFor(message.member)

		message.channel.send(util.inspect(finalPermissions.serialize()), {
			code: 'js',
		})
	},
}
