import axios from 'axios'
export const getUsers = (page) => {
  return axios.get('./users', { params: { page } })
}
export const getUser = (id) => {
  return axios.get(`./users/edit/${id}`)
}
export const updateUser = (id, name, phoneNumber, role) => {
  return axios.post(`./users/edit/${id}`, {
    name,
    phone_number: phoneNumber,
    role,
  })
}
export const findUser = (phoneNumber,page) => {
  return axios.get('./users/search', { params: { phone_number: phoneNumber ,page} })
}
