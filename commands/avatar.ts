import { customCommand } from '../utils/createCommand'

export default customCommand(
  (interaction) => {
    const user = interaction.user

    if (!user) {
      return 'Vous devez mentionner un utilisateur'
    }

    return user.displayAvatarURL({ extension: 'png' })
  },
  {
    name: 'avatar',
    description: "Récupère l'avatar des personnes taguées ou de ton avatar!",
  }
)
