import axios from 'axios'
export const getCities = (page) => {
  return axios.get('./product', { params: { page } })
}
export const createCity = (name, publicGroupID, privateGroupID) => {
  return axios.post('./cities/create', {
    name,
    public_group: publicGroupID,
    private_group: privateGroupID,
  })
}
export const getCity = (id) => {
  return axios.get(`./cities/edit/${id}`)
}
export const updateCity = (id, name, publicGroupID, privateGroupID) => {
  return axios.post(`./cities/edit/${id}`, {
    name,
    public_group: publicGroupID,
    private_group: privateGroupID,
  })
}

export const deleteGroup = (id) => {
  return axios.delete(`./fb-group/${id}`)
}
