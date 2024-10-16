import { useQuery } from 'react-query'
import { fetchProviders } from 'servers'
import { useProviders } from 'stores' // Your Zustand store

export const useFetchProviders = (userId: string) => {
  const { setProviders } = useProviders()

  // Use React Query to fetch the data and set it in Zustand store
  return useQuery(['providers', userId], () => fetchProviders(userId), {
    onSuccess: data => {
      // Set the fetched providers in Zustand store
      setProviders(data)
    },
    onError: error => {
      console.error('Error fetching providers:', error)
    },
  })
}
