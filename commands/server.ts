import { customCommand } from '../utils/createCommand'

export default customCommand(
  (interaction) => {
    const { guild } = interaction
    if (!guild) {
      return ''
    }
    return `${guild.name} contient ${guild.memberCount} membres`
  },
  {
    name: 'server',
    description: 'Voir les infos du serveur',
  }
)
