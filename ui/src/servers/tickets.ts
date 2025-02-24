import server from './server'

export const fetchTickets = async (userId: string) => {
  const { data } = await server.get(`/tickets/${userId}`)
  return data
}
