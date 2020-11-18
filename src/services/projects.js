import axios from 'axios'
import storage from '../utils/storage'
import {apiBaseUrl} from '../constants'

const baseUrl = `${apiBaseUrl}/projects`

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject, getConfig())
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl, getConfig())
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${ baseUrl }/${id}`, getConfig())
  return response.data
}

const remove = async(id) => {
  await axios.delete(`${ baseUrl }/${id}`, getConfig())
}

export default { create, update, getAll, getById, remove }