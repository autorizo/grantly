import cn from 'classnames'
import { PermissionButtonProps } from './PermissionButton.types'
import { PermissionStatus } from 'stores'
import { IconPermission } from 'components'
import { useState } from 'react'

export const PermissionButton = ({
  status,
  id,
  image,
  togglePermission,
}: PermissionButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    setIsAnimating(true)
    togglePermission(id)
    setTimeout(() => setIsAnimating(false), 300) // Duration matches your CSS transition/animation
  }

  const className = cn(
    'focus:outline-none bg-opacity-30 rounded-full transition-all duration-200 ease-in-out p-2 shadow-md text-primary bg-primary text-white shadow-slate-400',
    {
      'bg-green-500 shadow-slate-300 bg-opacity-90 border-none':
        status === PermissionStatus.Active,
      'transform scale-105': isAnimating, // Add scale effect during animation
    }
  )

  const hidePermissionButton = status === PermissionStatus.Blocked

  return hidePermissionButton ? null : (
    <button onClick={handleClick} className={className}>
      <IconPermission image={image} />
    </button>
  )
}
