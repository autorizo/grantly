import server from './server'

export const fetchTickets = async () => {
  const { data } = await server.get(`/tickets`)
  return data
}
