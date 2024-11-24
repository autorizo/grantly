import cn from 'classnames'
import { useState } from 'react'
import {
  BellIcon,
  BlockIcon,
  Drawer,
  HamburguerIcon,
  ProfileIcon,
} from 'components'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts'
import { useFetchNotifications, useFetchProviders } from 'hooks'
import { useProviders } from 'stores'

export const Banner = () => {
  const { session, signOut } = useAuth() ?? {}
  const userId = session?.user?.id ?? ''

  useFetchProviders(userId)
  useFetchNotifications(userId)
  const { providers } = useProviders()

  const totalPoints = providers.active.reduce(
    (total, provider) => total + provider.total,
    0
  )

  const [isDrawerOpen, setIsDrawerOpen] = useState(false) // State to manage drawer visibility
  const location = useLocation()
  const navigate = useNavigate() // Hook to navigate programmatically

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen) // Toggle the drawer state
  }

  // Determine if the current location is the notifications page
  const isNotificationsPage = location.pathname === '/notifications'

  const handleClick = () => {
    navigate('/blocked') // Navigate to the blocked page
    toggleDrawer() // Close the drawer
  }

  return (
    <div className='flex bg-primary justify-between p-4 pb-4 mb-2'>
      <div className='flex items-center justify-center'>
        <div className='flex items-center justify-center gap-1 focus:outline-none rounded-full transition-colors p-2'>
          <button onClick={toggleDrawer}>
            {/* Toggle the drawer on button click */}
            <HamburguerIcon className='w-7 h-7 text-white' />
          </button>
        </div>
      </div>

      <div className='flex justify-center flex-col'>
        <h1 className='text-sm sm:text-xs text-white'>
          <span className='font-semibold'>Jorge</span>, bienvenido a
          <span className='font-semibold'> Autorizo</span>
        </h1>
        <p className='text-xs sm:text-md text-white'>
          Tienes un total de{' '}
          <span className='font-semibold'>{totalPoints}</span> puntos
        </p>
      </div>

      <div className='flex items-center'>
        <div
          className={cn(
            'flex items-center justify-center gap-1 focus:outline-none rounded-full transition-colors p-[1px]',
            {
              'bg-white': isNotificationsPage,
            }
          )}
        >
          <Link to='/notifications'>
            <BellIcon
              className={cn('w-6 h-6', {
                'text-primary': isNotificationsPage,
                'text-white': !isNotificationsPage,
              })}
            />
          </Link>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div className='flex items-center justify-center gap-1 focus:outline-none rounded-full transition-colors bg-white p-2'>
          <ProfileIcon className='w-7 h-7 text-primary' />
        </div>
      </div>

      {/* Include the Drawer component */}
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} position='left'>
        {/* You can put the content for your drawer here */}
        <div className='p-4'>
          <button className='w-full' onClick={handleClick}>
            <div className='flex items-center gap-2 border-t border-b py-4'>
              <BlockIcon className='h-5 w-5' />
              <h2 className='text-md font-semibold'>Bloqueados</h2>
            </div>
          </button>
        </div>
        <div className='absolute bottom-4 left-4 right-4'>
          <button className='w-full' onClick={signOut}>
            <div className='flex items-center gap-2 border-t border-b py-4'>
              <BlockIcon className='h-5 w-5' />
              <h2 className='text-md font-semibold'>Cerrar sesión</h2>
            </div>
          </button>
        </div>
      </Drawer>
    </div>
  )
}
