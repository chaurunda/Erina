import BlaguesAPI from 'blagues-api'
import { Client, Intents } from 'discord.js'

import { commands } from './commands'
import { blagueToken } from './config.json'
import { token } from './config.json'
import { ExecuteFn } from './utils/createCommand'
import { setUserRole } from './utils/setUserRole'

const client = new Client({
  partials: ['USER', 'MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER'],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
})

const executeList: Record<string, ExecuteFn> = {}
const addRole = setUserRole('add')
const removeRole = setUserRole('remove')
const blagues = new BlaguesAPI(blagueToken)

client.once('ready', async () => {
  console.log('Ready!')

  for (const { execute, command } of commands) {
    client.application?.commands.create(command)
    console.log(command.name)
    executeList[command.name] = execute
  }

  client.user?.setActivity("/help pour avoir de l'aide", { type: 'LISTENING' })
})

client.on('messageReactionAdd', addRole)

client.on('messageReactionRemove', removeRole)

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  if (interaction.commandName === 'blague') {
    async function getBlague() {
      return await blagues.random({
        disallow: [blagues.categories.DARK, blagues.categories.LIMIT],
      })
    }
    getBlague().then(async (blague) => {
      await interaction.reply(`${blague.joke}\n${blague.answer}`)
      return
    })
  } else if (interaction.commandName === 'chaton') {
    interaction.reply(await executeList[interaction.commandName](interaction))
  } else {
    await interaction.reply(executeList[interaction.commandName](interaction).toString())
  }
})

client.login(token)
