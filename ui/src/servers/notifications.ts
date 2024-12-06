import server from './server'

export const fetchNotifications = async (userId: string) => {
  const { data } = await server.get(`/notifications/${userId}`)
  return data
}
