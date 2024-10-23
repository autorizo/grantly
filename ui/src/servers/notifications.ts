import axios from 'axios'

const apiUrl = process.env.REACT_APP_BE_URL

export const fetchNotifications = async (userId: string) => {
  const { data } = await axios.get(`${apiUrl}/notifications/${userId}`)
  return data
}
