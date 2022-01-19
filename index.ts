import {
	ApplicationCommandDataResolvable,
	Client,
	ClientEvents,
	Intents,
} from 'discord.js'
import { token, messageId, availableRoles } from './config.json'
import fs from 'fs'

const client = new Client({
	partials: ['USER', 'MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER'],
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGES,
	],
})

// 1 - Mettre en ts export {execute: ExecuteType, command}
// 2 - Au require du fichier -> var commands = Record<commandName, execute>
// 3 - interactionCreate -> if isCommand() => interaction.reply(commands[commandName]())

client.once('ready', () => {
	console.log('Ready!')

	const commands = [
		{
			name: 'ping',
			description: 'Replies with Pong!',
		},
	]
	const commandFiles = fs
		.readdirSync('./commands')
		.filter((file) => file.endsWith('.js'))

	for (const file of commandFiles) {
		const { execute, command } = require(`./commands/${file}`)
		client.application?.commands.create(command)
	}

	client.application?.commands.create(commands[0])
})

type SetUserRole = (
	eventType: 'add' | 'remove',
) => (...args: ClientEvents['messageReactionAdd']) => Promise<void>

const setUserRole: SetUserRole = (eventType) => {
	return async function (reaction, user) {
		if (!user || user.bot) return
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
			const selectedRole = availableRoles.find(
				(role) => reaction.emoji.name === role,
			)

			const guild = reaction.message.guild
			if (selectedRole && guild) {
				const memberWhoReacted = guild.members.cache.find(
					(member) => member.id === user.id,
				)
				let role = guild.roles.cache.find((r) => r.name == selectedRole)

				if (memberWhoReacted && role) {
					let event =
						eventType === 'add'
							? memberWhoReacted.roles.add(role)
							: memberWhoReacted.roles.remove(role)
					event.catch(console.error)
				}
			}
		}
	}
}

const add = setUserRole('add')
const remove = setUserRole('remove')

client.on('messageReactionAdd', add)

client.on('messageReactionRemove', remove)

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!')
	}
})

client.login(token)
