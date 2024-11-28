import React, { useState } from 'react'
import cn from 'classnames'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from 'contexts'
import {
  BellIcon,
  BlockIcon,
  Drawer,
  HamburguerIcon,
  LogOutIcon,
  ProfileIcon,
} from 'components'
import { useFetchNotifications, useFetchProviders } from 'hooks'
import { useProviders } from 'stores'
import { BannerProps } from './Banner.types'

export const Banner = ({ userName }: BannerProps) => {
  const { session, signOut, profilePhoto } = useAuth() // Get profilePhoto from context
  const userId = session?.user?.id ?? ''

  useFetchProviders(userId)
  useFetchNotifications(userId)
  const { providers } = useProviders()

  const totalPoints = providers.active.reduce(
    (total, provider) => total + provider.total,
    0
  )

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const isNotificationsPage = location.pathname === '/notifications'

  const handleClick = () => {
    navigate('/blocked')
    toggleDrawer()
  }

  const openProfile = () => {
    navigate('/profile')
    toggleDrawer()
  }

  return (
    <div className='flex bg-primary justify-between p-4 pb-4 mb-2'>
      <div className='flex items-center justify-center'>
        <div className='flex items-center justify-center gap-1 focus:outline-none rounded-full transition-colors p-2'>
          <button onClick={toggleDrawer}>
            <HamburguerIcon className='w-7 h-7 text-white' />
          </button>
        </div>
      </div>

      <div className='flex justify-center flex-col'>
        <h1 className='text-sm sm:text-xs text-white'>
          <span className='font-semibold'>{userName}</span>, bienvenido a
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
            { 'bg-white': isNotificationsPage }
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
        <div
          className={`flex items-center justify-center gap-1 focus:outline-none transition-colors 
      ${profilePhoto ? '' : 'p-2 bg-white rounded-full'}`}
        >
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt='Profile'
              className='w-9 h-9 rounded-full object-cover'
            />
          ) : (
            <ProfileIcon className='w-7 h-7 text-primary' />
          )}
        </div>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} position='left'>
        <div className='p-4'>
          <button className='w-full' onClick={handleClick}>
            <div className='flex items-center gap-2 border-t border-b py-4'>
              <BlockIcon className='h-5 w-5' />
              <h2 className='text-md font-semibold'>Bloqueados</h2>
            </div>
          </button>
          <button className='w-full' onClick={openProfile}>
            <div className='flex items-center gap-2 border-b py-4'>
              <ProfileIcon className='h-5 w-5' />
              <h2 className='text-md font-semibold'>Perfil</h2>
            </div>
          </button>
        </div>
        <div className='absolute bottom-4 left-4 right-4'>
          <button className='w-full' onClick={signOut}>
            <div className='flex items-center gap-2 border-t border-b py-4'>
              <LogOutIcon className='h-5 w-5' />
              <h2 className='text-md font-semibold'>Cerrar sesión</h2>
            </div>
          </button>
        </div>
      </Drawer>
    </div>
  )
}
