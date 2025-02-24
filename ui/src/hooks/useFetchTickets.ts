import { useQuery } from 'react-query'
import { fetchTickets } from 'servers'
import { useTickets } from 'stores'

export const useFetchTickets = (userId: string) => {
  const { setTickets } = useTickets()

  // Use React Query to fetch the data and set it in Zustand store
  return useQuery(['tickets', userId], () => fetchTickets(), {
    onSuccess: data => {
      // Set the fetched providers in Zustand store
      setTickets(data)
    },
    onError: error => {
      console.error('Error fetching tickets:', error)
    },
  })
}
