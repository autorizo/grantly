import { Link, useLocation } from 'react-router-dom'
import { BellIcon, StarActiveIcon, StarAddIcon } from 'components'
import { NavigationTabsProps } from './NavigationTabs.types'

const tabs = [
  {
    id: 'active',
    label: 'Activos',
    icon: StarActiveIcon,
    path: '/active', // Added path for routing
  },
  {
    id: 'inactive',
    label: 'Inactivos',
    icon: StarAddIcon,
    path: '/inactive', // Added path for routing
  },
  {
    id: 'notifications',
    label: 'Notificaciones',
    icon: BellIcon,
    path: '/notifications', // Added path for routing
  },
]

export const NavigationTabs = ({
  activeTab,
}: NavigationTabsProps) => {
  const location = useLocation()
  const active = location.pathname ?? activeTab
    
  return (
    <div className='fixed bottom-0 w-full flex justify-center'>
      <nav className='flex justify-center items-center gap-2 bg-primary p-4 rounded-md m-4 w-fit text-primary'>
        {tabs.map(({ id, label, icon: Icon, path }) => (
          <Link
            to={path}
            key={id}
            className={`${
              active === path ? 'bg-white' : 'bg-white'
            } px-4 py-2 rounded-full transition duration-150 ease-in-out`}
          >
            <div className='flex justify-center text-sm items-center gap-1'>
              <Icon className='w-5 h-5' />
              {active === path && label}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  )
}
