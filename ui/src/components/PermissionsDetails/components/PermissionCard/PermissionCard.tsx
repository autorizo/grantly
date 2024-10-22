import cn from 'classnames'
import { formatDate } from 'utils'
import { PermissionCardProps } from './PermissionCard.types'
import { IconPermission } from 'components'
import { ButtonActions, PermissionState } from '..'
import { useState } from 'react'
import { useSwipe } from 'hooks'

export const PermissionCard = ({
  description,
  id,
  image,
  name,
  points,
  status,
  updatedAt,
  pdfPath,
  togglePermission,
  handleClick,
  providerStatus, // Receive providerStatus prop
}: PermissionCardProps) => {
  const [isSwiped, setIsSwiped] = useState(false)

  // Check if the provider status is blocked
  const isProviderBlocked = providerStatus === 'blocked'

  const { swipeDirection, resetSwipeDirection, ...props } = useSwipe({
    onSwipedLeft: () => {
      if (!isProviderBlocked) {
        // Only allow swipe left if provider is not blocked
        setIsSwiped(true)
      }
    },
    onSwipedRight: () => {
      if (!isProviderBlocked) {
        // Only allow swipe right if provider is not blocked
        resetSwipeDirection()
        setIsSwiped(false)
      }
    },
  })

  const showButton = !(swipeDirection === null || swipeDirection === 'right')

  const handleToggle = () => {
    togglePermission(id)
    resetSwipeDirection() // Reset swipe state
    setIsSwiped(false) // Ensure isSwiped state is also reset
  }

  return (
    <div className='flex relative'>
      <div
        {...props}
        className={cn(
          'flex justify-between gap-2 rounded-lg shadow-lg p-4 transition-width duration-300 w-full',
          {
            '-translate-x-1/4': isSwiped && swipeDirection === 'left',
            'translate-x-0': !isSwiped,
          }
        )}
      >
        <div className='flex gap-2'>
          <IconPermission image={image} />
          <div className='flex flex-col'>
            <h3 className='text-md font-semibold'>{name}</h3>
            {!isProviderBlocked && (
              <PermissionState status={status} points={points} />
            )}
            <p className='text-xs text-gray-800'>{description}</p>
            {!isProviderBlocked && updatedAt && (
              <p className='text-xs text-gray-500'>Modificado {updatedAt}</p>
            )}
            <button
              onClick={() => {
                handleClick(pdfPath)
              }}
              className='text-xs underline font-semibold text-left text-primary'
              aria-label='View Terms and Conditions'
            >
              Términos y Condiciones
            </button>
          </div>
        </div>
      </div>
      {!isProviderBlocked && showButton && (
        <button
          onClick={handleToggle}
          className={cn(
            'text-xs font-semibold text-white rounded-lg p-2 duration-500 absolute h-full top-0 right-0 transition-all opacity-0 w-20',
            {
              'bg-red-500 hover:bg-red-600': status === 'active',
              'bg-green-500 hover:bg-green-600': status === 'inactive',
              'opacity-100': showButton,
            }
          )}
          aria-label={
            status === 'active'
              ? 'Deactivate permission'
              : 'Activate permission'
          }
        >
          {status === 'active' ? 'Desactivar' : 'Activar'}
        </button>
      )}
    </div>
  )
}
