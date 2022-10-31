import { customCommand } from '../utils/createCommand'

export default customCommand(
  async (interaction, option) => {
    if (!option) return

    const [number, max] = option.description.split('d')
    let results: number[] = []
    let total: number = 0

    for (let index = 0; index < parseInt(number); index++) {
      const roll = Math.floor(Math.random() * parseInt(max))
      results.push(roll)
      total = total + roll
    }

    return `Rolled ${total} : [${results}]`
  },
  {
    name: 'roll',
    description: 'Laisse le destin choisir pour toi !',
  }
)
