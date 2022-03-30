import axios from 'axios'
export const getCities = (page) => {
  return axios.get('./cities', { params: { page } })
}
export const createCity = (name, groupID) => {
  return axios.post('./cities/create', { name, group_id: groupID })
}
export const getCity = (id) => {
  return axios.get(`./cities/edit/${id}`)
}
export const updateCity = (id, name, groupID) => {
  return axios.post(`./cities/edit/${id}`, { name, group_id: groupID })
}
