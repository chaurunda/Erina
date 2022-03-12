import axios from 'axios'

import { Cat } from '../types/catApi'
import { customCommand } from '../utils/createCommand'

export default customCommand(
  (interaction) => {
    try {
      const fetchCat = async () => {
        const response = await axios('https://aws.random.cat/meow')
        return response.data as Cat[]
      }

      return fetchCat().then((cat) => {
        return cat[0].url
      })
    } catch (error) {
      return 'Une erreur est survenue, essaye plus tard'
    }
  },
  {
    name: 'chaton',
    description: 'Nya ?!',
  }
)
