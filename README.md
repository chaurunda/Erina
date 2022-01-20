# Erina

A discord bot waifu that add role on reaction and give you many little command

## Requirement & Installation

It require the v16.13.2 of node (or use `nvm use`)

To install follow the steps :

Run `npm ci`

Run `cp config.json.dist config.json`

Open config.json and fill it

```javascript
{
  "token": "", // token of your bot
  "messageId": "", // the message ID where the reactions are
  "prefix": "", // The prefix pour commandes
  "availableRoles": [""] // The names of emojis the users have to click to get a role with the same name. ex : ‘rose‘ will set to the user a role named rose (must be already created onto your server)
}
```

and run `npm install`

## Commands

List of commands:

- /server : display some server info
- /userInfo : display user info
- /avatar : display the link of yout avatar
- /blague : display a joke and is answer (in frenc)
- /uwu : UwU

## How to

List of how to :

### Commands

This is how a to create a command :

Create a file in ./commands

In this file put the following code

```
import { customCommand } from '../utils/createCommand'

export default customCommand(
  () => {
    return ''
  },
  {
    name: '',
    description: '',
  }
)
```

The first method is what the bot is reply when you ask your command. It must be a string.

The second object is the name and a little description. It will be display when you type /<name> in chat

Then you have to import it in ./commands/index.ts and add it into the commands array.

Source :

DiscordJS Doc : https://discord.js.org/#/docs/discord.js/stable/general/welcome

DiscordJS Guide : https://discordjs.guide/#before-you-begin
