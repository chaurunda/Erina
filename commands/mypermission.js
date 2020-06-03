module.exports = {
	name: 'my-permission',
	description: 'Display all the permission a user have',
	permission: true,
	execute(message, args) {
		const finalPermissions = message.channel.permissionsFor(message.member)

		message.channel.send(util.inspect(finalPermissions.serialize()), {
			code: 'js',
		})
	},
}
