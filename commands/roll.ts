import { customCommand } from '../utils/createCommand'

export default customCommand(
  async (interaction, option) => {
    if (!option) return

    const [number, rest] = option.description.split('d')
    const [max = '1', modifier = '0'] = rest.split('+')
    let results: number[] = []
    let total: number = 0
    console.log(max, number, modifier)

    for (let index = 0; index < parseInt(number); index++) {
      const roll = Math.floor(Math.random() * (parseInt(max) - 1 + 1) + 1)
      results.push(roll)
      total = total + roll
    }

    total = total + parseInt(modifier)

    return `Rolled ${total} : [${results}] + ${modifier}`
  },
  {
    name: 'roll',
    description: 'Laisse le destin choisir pour toi !',
  }
)
