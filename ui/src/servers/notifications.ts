import server from './server'

const apiUrl = process.env.REACT_APP_BE_URL

export const fetchNotifications = async (userId: string) => {
  const { data } = await server.get(`/notifications/${userId}`)
  return data
}
