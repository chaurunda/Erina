# Erina

A discord bot waifu that add role on reaction and give you many little command

## Installation

To install follow the steps :

Run `npm ci`

Run `cp config.json.dist config.json`

Open config.json and fill it

```json
{
  "token": "", // token of your bot
  "messageId": "", // the message ID where the reactions are
  "prefix": "", // The prefix pour commandes
  "availableRoles": [""] // The names of emojis the users have to click to get a role with the same name. ex : :rose: will set to the user a role named rose (must be already created onto your server)
}
```

and run `npm install`

## Commands

List of commands:

- !prune <number> : remove the last any messages as the number you want
- !help : display all the commands available.
- !help <command> : display all the infos of a command
- !reload <command> : reload a command
- !server : display some server info
- !userInfo : display user info
- !avatar : display the link of yout avatar
- !avatar <user> : display the link of the user
- !my-permission : display all of the permissions you have on the server

## How to

List of how to :

### Commands

This is how a command is written

- name: String
- description: String
- permission?: Boolean
- usage?: String
- args?: true
- aliases?: Array<string>
- cooldown?: Integer
- guildOnly: boolean
- execute(message, args){}

Explanation

_name_ is the name of your command : help, kick, my-permission, ...

_description_ is the description for the help

_permission_ (optional) is a boolean. If set to true, you must have permission to kick, ban, manage message to run this command

_usage_ (optional) is a description of how to use the command

_args_ (optional) is a boolean. If set to true, the command must have an arg to run : kick

_aliases_ is an array of strings. It's a list of alias for your command : avatar

_cooldown_ is a number (in sec) for preventing spam. It set to 3 secondes by default

_guildOnly_ is a boolean. If true the command must be send on a channel and not in DM

_execute_ is where the magic happen ...
