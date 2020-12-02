import axios from 'axios'
import { apiBaseUrl } from '../constants'

const baseUrl = `${apiBaseUrl}/login`

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }