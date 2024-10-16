import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export const fetchNotifications = async (userId: string) => {
  const { data } = await axios.get(`${API_URL}/users/${userId}/permissions/log`)
  return data
}
