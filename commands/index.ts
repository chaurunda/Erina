import { ApplicationCommandDataResolvable, Message } from 'discord.js'
// https://discordjs.guide/interactions/registering-slash-commands.html#choices
// TODO
type ExecuteFn = () => void

export const createCommand = (
	execute: ExecuteFn,
	command: ApplicationCommandDataResolvable,
) => ({
	execute,
	command,
})
