const fs = require('fs')
const { Client, Collection } = require('discord.js')
const { prefix, token, messageId, availableRoles } = require('./config.json')
const onMessage = require('./events/onMessage')

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.commands = new Collection()

const commandFiles = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}

const cooldowns = new Collection()

client.once('ready', () => {
	console.log('Ready!')
})

client.on('message', (message) => {
	onMessage.execute(message, prefix, client, cooldowns)
})

client.on('messageReactionAdd', async (reaction, user) => {
	if (!user) return
	if (user.bot) return
	if (!reaction.message.channel.guild) return
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch()
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error)
			// Return as `reaction.message.author` may be undefined/null
			return
		}
	}

	//Filter the reaction
	if (reaction.message.id === messageId) {
		for (let n in availableRoles) {
			if (reaction.emoji.name == availableRoles[n]) {
				const guild = reaction.message.guild

				const memberWhoReacted = guild.members.cache.find(
					(member) => member.id === user.id,
				)
				let role = reaction.message.guild.roles.cache.find(
					(r) => r.name == availableRoles[n],
				)
				memberWhoReacted.roles.add(role).catch(console.error)
			}
		}
	}
})

client.on('messageReactionRemove', async (reaction, user) => {
	if (!user) return
	if (user.bot) return
	if (!reaction.message.channel.guild) return
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch()
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error)
			// Return as `reaction.message.author` may be undefined/null
			return
		}
	}

	//Filter the reaction
	if (reaction.message.id === messageId) {
		for (let n in availableRoles) {
			if (reaction.emoji.name == availableRoles[n]) {
				const guild = reaction.message.guild

				const memberWhoReacted = guild.members.cache.find(
					(member) => member.id === user.id,
				)
				let role = reaction.message.guild.roles.cache.find(
					(r) => r.name == availableRoles[n],
				)
				memberWhoReacted.roles.remove(role).catch(console.error)
			}
		}
	}
})

client.login(token)
