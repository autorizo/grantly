import { Link, useLocation } from 'react-router-dom'
import { BellIcon, StarActiveIcon, StarAddIcon } from 'components'
import { NavigationTabsProps } from './NavigationTabs.types'

const tabs = [
  {
    id: 'active',
    label: 'Autorizados',
    icon: StarActiveIcon,
    path: '/active', // Added path for routing
  },
  {
    id: 'inactive',
    label: 'Pendientes',
    icon: StarAddIcon,
    path: '/inactive', // Added path for routing
  },
]

export const NavigationTabs = ({ activeTab }: NavigationTabsProps) => {
  const location = useLocation()
  const active = location.pathname ?? activeTab

  return (
    <div className='w-full flex justify-center'>
      <nav className='flex justify-center items-center gap-2  p-4 rounded-md w-fit text-primary '>
        {tabs.map(({ id, label, icon: Icon, path }) => (
          <Link
            to={path}
            key={id}
            className={`${
              active === path
                ? 'bg-primary text-white shadow-white'
                : 'bg-white'
            } px-4 py-2 rounded-full transition duration-150 ease-in-out shadow-primary shadow-sm`}
          >
            <div className='flex justify-center text-sm items-center gap-1'>
              <Icon className='w-5 h-5' />
              {label}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  )
}
