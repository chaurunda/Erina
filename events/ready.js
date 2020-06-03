module.exports = class {
	constructor(client) {
		this.client = client
	}

	async run() {
		console.log(
			`${this.client.user.tag}, ready to serve ${this.client.users.size} users in ${this.client.guilds.size} servers.`,
		)

		this.client.user.setActivity(`${this.client.config.prefix}help`, {
			type: 'LISTENING',
		})
	}
}
