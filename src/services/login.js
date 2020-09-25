import axios from 'axios'
const baseUrl = 'https://obscure-waters-16235.herokuapp.com/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }