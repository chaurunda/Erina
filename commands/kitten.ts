import axios from 'axios'

import { Cat } from '../types/catApi'
import { customCommand } from '../utils/createCommand'

export default customCommand(
  async (interaction) => {
    try {
      const fetchCat = async () => {
        const response = await axios('https://api.thecatapi.com/v1/images/search?mime_types=gif')
        return response.data as Cat[]
      }

      const data = await fetchCat()

      return data[0].url
    } catch (error) {
      return 'Une erreur est survenue, essaye plus tard'
    }
  },
  {
    name: 'chaton',
    description: 'Nya ?!',
  }
)
