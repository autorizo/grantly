import { useQuery } from 'react-query'
import { fetchNotifications } from 'servers'
import { useNotification } from 'stores'

export const useFetchNotifications = (userId: string) => {
  const { setNotifications } = useNotification()

  // Use React Query to fetch the data and set it in Zustand store
  return useQuery(['notifications', userId], () => fetchNotifications(userId), {
    onSuccess: data => {
      // Set the fetched providers in Zustand store
      setNotifications(data)
    },
    onError: error => {
      console.error('Error fetching providers:', error)
    },
  })
}
