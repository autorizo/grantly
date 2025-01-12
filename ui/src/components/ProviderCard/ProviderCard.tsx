import { useState } from 'react'
import { ProviderCardProps } from './ProviderCard.types'
import {
  PermissionsDetails,
  PermissionButton,
  Drawer,
  IconMapTypes,
} from 'components'
import { ProviderHeader } from './components'
import { ProviderStatus } from 'stores'
import cn from 'classnames'

export const ProviderCard = ({
  provider,
  togglePermission,
}: ProviderCardProps) => {
  const { name, total, permissions, description, status, id } = provider
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(true)
  }

  return (
    <div className='flex flex-col gap-y-2 p-4 shadow-sm bg-white rounded-lg w-full'>
      <ProviderHeader
        id={id}
        name={name}
        total={total}
        description={description}
        status={status}
      />
      <div className='flex justify-between'>
        <div className='flex items-center gap-x-1 mt-2'>
          {status !== ProviderStatus.Blocked &&
            permissions.map(({ id, status, image }, index) => (
              <PermissionButton
                key={index}
                id={id}
                status={status}
                image={image as IconMapTypes}
                togglePermission={togglePermission}
              />
            ))}
        </div>
        <div
          className='cursor-pointer text-xs underline font-semibold text-left text-primary self-end'
          onClick={handleClick}
        >
          Ver más
        </div>
      </div>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className='flex flex-col gap-4'>
          <ProviderHeader
            id={id}
            name={name}
            total={total}
            description={description}
            status={status}
            isInDetail
            closeParentDrawer={() => setIsOpen(false)}
          />
          <p>Obten puntos habilitando permisos</p>
          <PermissionsDetails
            togglePermission={togglePermission}
            permissions={permissions}
            providerStatus={status}
          />
        </div>
      </Drawer>
    </div>
  )
}
