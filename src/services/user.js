import axios from 'axios'
const baseUrl = 'https://obscure-waters-16235.herokuapp.com/api/users'

const register = async user => {
  const response = await axios.post(baseUrl, user)
  return response.data
}

export default { register }
