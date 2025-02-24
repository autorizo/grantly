import { useAuth } from 'contexts'
import { useFetchTickets } from 'hooks'
import { useTickets } from 'stores'
// import { useTickets } from 'stores'

export const Tickets = () => {
  const { session } = useAuth() ?? {}
  const userId = session?.user?.id ?? ''
  useFetchTickets(userId)
  const { categories } = useTickets()

  return (
    <div className='p-1 flex flex-col gap-1'>
      {categories.length === 0 && (
        <div className='text-center text-gray-500'>Nada para mostrar</div>
      )}
    </div>
  )
}
