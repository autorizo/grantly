import { Outlet } from 'react-router-dom'
import { Banner, NavigationTabs } from 'components'
import { useAuth } from 'contexts'
import { LoginLayout } from 'layouts'

export const RootLayout = () => {
  const { session } = useAuth() ?? {}

  if (!session) {
    return <LoginLayout />
  }

  return (
    <div className='bg-gray-100 h-screen overflow-auto pb-2'>
      <Banner />

      {/* Navigation Tabs */}
      <NavigationTabs activeTab='/active' />

      {/* Outlet for rendering child routes */}
      <div className='px-2 pb-20'>
        <Outlet />
      </div>
    </div>
  )
}
