const Discord = require('discord.js')
const { promisify } = require('util')
const readdir = promisify(require('fs').readdir)
const client = new Discord.Client()
client.config = require('./config.json')

require('./modules/functions.js')(client)

// Todo: use Discord.Collection
client.commands = []
client.aliases = []

const init = async () => {
	const cmdFiles = await readdir('./commands/')

	cmdFiles.forEach((file) => {
		if (!file.endsWith('.js')) return

		const response = client.loadCommand(file)

		if (response) console.log(response)
	})

	const evtFiles = await readdir('./events/')
	evtFiles.forEach((file) => {
		const eventName = file.split('.')[0]
		const event = new (require(`./events/${file}`))(client)

		client.on(eventName, (...args) => event.run(...args))
	})

	client.login(client.config.token)
}

init()
