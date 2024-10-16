import cn from 'classnames'

import { ToggleButtonProps } from './ToggleButton.types'
import { PermissionStatus } from 'stores'

const permissionStateLabel = (status: PermissionStatus) =>
  status === PermissionStatus.Active ? 'Deshabilitar' : 'Habilitar'

export const ToggleButton = ({ status, onClick }: ToggleButtonProps) => {
  const stateLabel = permissionStateLabel(status)
  const stateClass = cn(
    'text-xs flex items-center gap-1 border-[1.35px] rounded-md p-1 w-fit font-semibold',
    {
      'text-gray-500 border-gray-500': status === PermissionStatus.Active,
      'text-green-500 border-green-500':
        status !== PermissionStatus.Blocked &&
        status !== PermissionStatus.Active,
    }
  )

  return <button onClick={onClick} className={stateClass}>{stateLabel}</button>
}
