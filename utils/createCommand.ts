import { Interaction, ApplicationCommandOption, ApplicationCommandData } from 'discord.js'

export type ExecuteFn = (interraction: Interaction, option?: ApplicationCommandOption) => string | Promise<any>

type CreateCommandCustom = (
  execute: ExecuteFn,
  command: ApplicationCommandData
) => {
  execute: ExecuteFn
  command: ApplicationCommandData
}

export const customCommand: CreateCommandCustom = (execute, command) => ({
  execute,
  command,
})
