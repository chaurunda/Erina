const fs = require('fs')
const { Client, Collection } = require('discord.js')
const { prefix, token, messageId, availableRoles } = require('./config.json')

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
	if (!message.content.startsWith(prefix) || message.author.bot) return

	const args = message.content.slice(prefix.length).split(/ +/)
	const commandName = args.shift().toLowerCase()

	const command =
		client.commands.get(commandName) ||
		client.commands.find(
			(cmd) => cmd.aliases && cmd.aliases.includes(commandName),
		)

	if (!command) return

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply("I can't execute that command inside DMs!")
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
		}

		return message.channel.send(reply)
	}

	if (command.permission) {
		if (
			!message.member.hasPermission([
				'KICK_MEMBERS',
				'BAN_MEMBERS',
				'MANAGE_MESSAGES',
			])
		) {
			return message.channel.send(
				"Tu n'as pas les droits suffisant pour effectuer cette commande",
			)
		}
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Collection())
	}

	const now = Date.now()
	const timestamps = cooldowns.get(command.name)
	const cooldownAmount = (command.cooldown || 3) * 1000

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000
			return message.reply(
				`please wait ${timeLeft.toFixed(
					1,
				)} more second(s) before reusing the \`${command.name}\` command.`,
			)
		}
	}

	timestamps.set(message.author.id, now)
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

	try {
		command.execute(message, args)
	} catch (error) {
		console.error(error)
		message.reply('there was an error trying to execute that command!')
	}
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
