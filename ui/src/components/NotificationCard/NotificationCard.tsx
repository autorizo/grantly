import cn from 'classnames'
import { NotificationCardProps } from './NotificationCard.types'
import { PermissionStatus } from 'stores'

export const NotificationCard = ({
  provider_name,
  permission_name,
  justification,
  created_at,
  permission_points,
  status,
}: NotificationCardProps) => {
  // Label for the current status
  const labelState = {
    active: 'activado',
    blocked: 'bloqueado',
    disabled: 'deshabilitado',
  }
  const label = labelState[status]

  // CSS classes for status label
  const labelClass = cn('font-semibold', {
    'text-green-500': status === PermissionStatus.Active,
    'text-red-500': status === PermissionStatus.Blocked,
    'text-gray-500': status === PermissionStatus.Inactive,
  })

  // CSS classes for points
  const pointsClass = cn('font-semibold', {
    'text-green-500': status === PermissionStatus.Active,
    'text-red-500': status !== PermissionStatus.Active,
  })

  const pointsMessage =
    permission_points !== 0
      ? `Ha ${status === PermissionStatus.Active ? 'ganado' : 'perdido'}`
      : null

  return (
    <div className='border border-gray-300 rounded-md p-3 bg-white shadow-sm'>
      <p className='text-xs text-gray-800'>
        Usted ha <span className={labelClass}>{label}</span> el permiso&nbsp;
        <span className='font-semibold'>{permission_name}</span> para el
        proveedor <span className='font-semibold'>{provider_name}</span>.
        {pointsMessage && (
          <span>
            &nbsp;{pointsMessage}&nbsp;
            <span className={pointsClass}>{permission_points}</span>
            &nbsp;puntos.
          </span>
        )}
        {justification && (
          <p>
            Con la siguiente declaración:
            <p className='italic'>"{justification}"</p>
          </p>
        )}
      </p>
      <p className='text-[0.6rem] text-gray-500 mt-1'>{created_at}</p>
    </div>
  )
}
