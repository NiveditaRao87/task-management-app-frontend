import axios from 'axios'
const baseUrl = '/api/cards'

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  return response.data
}

const getById = async (id) => {
    const response = await axios.get(`${ baseUrl }/${id}`)
    return response.data
}

export default { create, update, getById }