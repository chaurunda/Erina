import { ClientEvents } from 'discord.js'

import { messageId, availableRoles } from '../config.json'

type SetUserRole = (eventType: 'add' | 'remove') => (...args: ClientEvents['messageReactionAdd']) => Promise<void>

export const setUserRole: SetUserRole = (eventType) => {
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
      const selectedRole = availableRoles.find((role) => reaction.emoji.name === role)

      const guild = reaction.message.guild
      if (selectedRole && guild) {
        const memberWhoReacted = guild.members.cache.find((member) => member.id === user.id)
        let role = guild.roles.cache.find((r) => r.name == selectedRole)

        if (memberWhoReacted && role) {
          let event = eventType === 'add' ? memberWhoReacted.roles.add(role) : memberWhoReacted.roles.remove(role)
          event.catch(console.error)
        }
      }
    }
  }
}
