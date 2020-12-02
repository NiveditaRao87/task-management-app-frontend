import axios from 'axios'
import { apiBaseUrl } from '../constants'

const baseUrl = `${apiBaseUrl}/users`

const register = async user => {
  const response = await axios.post(baseUrl, user)
  return response.data
}

export default { register }
