import BlaguesAPI from 'blagues-api'
import { ActivityType, Client, Events, GatewayIntentBits, Partials } from 'discord.js'

import { commands } from './commands'
import { blagueToken } from './config.json'
import { token } from './config.json'
import { ExecuteFn } from './utils/createCommand'
import { setUserRole } from './utils/setUserRole'

const client = new Client({
  partials: [Partials.User, Partials.Message, Partials.Channel, Partials.Reaction, Partials.GuildMember],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
  ],
})

const executeList: Record<string, ExecuteFn> = {}
const addRole = setUserRole('add')
const removeRole = setUserRole('remove')
const blagues = new BlaguesAPI(blagueToken)

client.once(Events.ClientReady, async () => {
  console.log('Ready!')

  for (const { execute, command } of commands) {
    client.application?.commands.create(command)

    executeList[command.name] = execute
  }

  client.user?.setActivity("/help pour avoir de l'aide", { type: ActivityType.Listening })
})

client.on(Events.MessageReactionAdd, addRole)

client.on(Events.MessageReactionRemove, removeRole)

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return

  console.log(executeList)
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
  } else if (interaction.commandName === 'chaton' || interaction.commandName === 'doggo') {
    interaction.reply(await executeList[interaction.commandName](interaction))
  } else {
    await interaction.reply(executeList[interaction.commandName](interaction).toString())
  }
})

client.login(token)
