import axios from 'axios'
export const getProducts = (page) => {
  return axios.get('./product', { params: { page } })
}
export const createCity = (name, publicGroupID, privateGroupID) => {
  return axios.post('./cities/create', {
    name,
    public_group: publicGroupID,
    private_group: privateGroupID,
  })
}
export const getProduct = (id) => {
  return axios.get(`./product/find/${id}`)
}
export const updateProduct = (id, data) => {
  return axios.put(`./product/${id}`, { ...data })
}

export const deleteGroup = (id) => {
  return axios.delete(`./fb-group/${id}`)
}
