import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Banner, NavigationTabs } from 'components'
import { useProviders } from 'stores'
import { useFetchNotifications, useFetchProviders } from 'hooks'

const userId = process.env.REACT_APP_USER_ID ?? ''

export const RootLayout = () => {
  const { providers } = useProviders()
  useFetchProviders(userId)
  useFetchNotifications(userId)

  const totalPoints = providers.active.reduce(
    (total, provider) => total + provider.total,
    0
  )

  return (
    <div className='bg-gray-100 h-screen overflow-auto pb-2'>
      <Banner totalPoints={totalPoints} />

      {/* Navigation Tabs */}
      <NavigationTabs activeTab='/active' />

      {/* Outlet for rendering child routes */}
      <div className='px-2 pb-20'>
        <Outlet />
      </div>
    </div>
  )
}
