import cn from 'classnames'
import { PermissionStateProps, States } from './PermissionState.types'
import { PermissionStatus } from 'stores'

const permissionStateLabel = ({ blocked, enabled, points }: States) =>
  blocked
    ? 'Bloqueado'
    : enabled
    ? `${points} puntos obtenidos`
    : `Puedes obtener ${points} puntos`

export const PermissionState = ({ status, points }: PermissionStateProps) => {
  const blocked = status === PermissionStatus.Blocked
  const enabled = status === PermissionStatus.Active

  const stateClass = cn({
    'text-red-500': blocked,
    'text-green-500': enabled,
    'text-gray-800': !blocked && !enabled,
  })
  const stateLabel = permissionStateLabel({ blocked, enabled, points })
  return (
    <p className='text-xs font-semibold'>
      <span className={stateClass}>{stateLabel}</span>
    </p>
  )
}
