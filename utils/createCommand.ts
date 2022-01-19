import { Interaction, ApplicationCommandOption, ApplicationCommandDataResolvable } from 'discord.js'

export type ExecuteFn = (interraction: Interaction, option?: ApplicationCommandOption) => string

type CreateCommandCustom = (
  execute: ExecuteFn,
  command: ApplicationCommandDataResolvable
) => {
  execute: ExecuteFn
  command: ApplicationCommandDataResolvable
}

export const customCommand: CreateCommandCustom = (execute, command) => ({
  execute,
  command,
})
