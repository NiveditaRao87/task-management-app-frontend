//Look into the possibility of combining this and cards into a custom hook as shown in the fullstack open part 7a example
// There are some differences though

import axios from 'axios'
import storage from '../utils/storage'
const baseUrl = '/api/lists'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl, getConfig())
  return request.then(response => response.data)
}

const create = async newObject => {

  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject, getConfig())
  return request.then(response => response.data)
}

export default { getAll, create, update}