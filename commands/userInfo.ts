import { customCommand } from '../utils/createCommand'

export default customCommand(
  (interaction) => {
    return `Ton compte a été crée le ${interaction?.user.createdAt}`
  },
  {
    name: 'info',
    description: 'Je peux renvoyer ton nom ainsi que ton discord ID',
  }
)
