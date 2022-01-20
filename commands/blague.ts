import BlaguesAPI from 'blagues-api'

import { blagueToken } from '../config.json'
import { customCommand } from '../utils/createCommand'

const blagues = new BlaguesAPI(blagueToken)

export default customCommand(
  () => {
    try {
      async function getBlague() {
        return await blagues.random({
          disallow: [blagues.categories.DARK, blagues.categories.LIMIT],
        })
      }
      getBlague().then((blague) => {
        console.log(blague)
        return `${blague.joke} \n ${blague.answer}`
      })
    } catch (error) {
      return 'Une erreur est survenue, essaye plus tard'
    } finally {
      return ''
    }
  },
  {
    name: 'blague',
    description: 'Je te raconte une blague',
  }
)
