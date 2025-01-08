import cn from 'classnames'
import { PermissionButtonProps } from './PermissionButton.types'
import { PermissionStatus } from 'stores'
import { IconPermission } from 'components'

export const PermissionButton = ({
  status,
  id,
  image,
  togglePermission,
}: PermissionButtonProps) => {
  const className = cn(
    'focus:outline-none rounded-full transition-colors bg-green-500 p-2 shadow-md',
    status === PermissionStatus.Active
      ? 'bg-opacity-80'
      : 'bg-opacity-20 bg-primary shadow-sm'
  )

  const hidePermissionButton = status === PermissionStatus.Blocked
  const handleClick = () => {
    togglePermission(id)
  }

  return hidePermissionButton ? null : (
    <button onClick={handleClick} className={className}>
      <IconPermission image={image} />
    </button>
  )
}
