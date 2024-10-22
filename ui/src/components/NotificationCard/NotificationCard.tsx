import cn from 'classnames'
import { NotificationCardProps } from './NotificationCard.types'
import { NotificationAction } from 'stores'

export const NotificationCard = ({
  provider_name,
  permission_name,
  justification,
  created_at,
  permission_points,
  action,
}: NotificationCardProps) => {
  const labelState = {
    active_permission: 'activado',
    inactive_permission: 'desactivado',
    block_provider: 'bloqueado',
    unblock_provider: 'desbloqueado',
  }

  // Determine the correct label based on the action
  const label = labelState[action] || ''

  // CSS classes for status label
  const labelClass = cn('font-semibold', {
    'text-green-500':
      action === NotificationAction.Active ||
      action === NotificationAction.Unblocked,
    'text-red-500':
      action === NotificationAction.Blocked ||
      action === NotificationAction.Inactive,
  })

  // CSS classes for points
  const pointsClass = cn('font-semibold', {
    'text-green-500':
      action === NotificationAction.Active ||
      action === NotificationAction.Unblocked,
    'text-red-500':
      action === NotificationAction.Blocked ||
      action === NotificationAction.Inactive,
  })

  // Determine points message
  const pointsMessage =
    permission_points !== 0 && permission_points !== null
      ? `Ha ${action === NotificationAction.Active || action === NotificationAction.Unblocked ? 'ganado' : 'perdido'}`
      : null

  return (
    <div className='border border-gray-300 rounded-md p-3 bg-white shadow-sm'>
      <p className='text-xs text-gray-800'>
        Usted ha <span className={labelClass}>{label}</span>
        {action === NotificationAction.Blocked ||
        action === NotificationAction.Unblocked ? (
          <>
            {' '}
            el proveedor <span className='font-semibold'>{provider_name}</span>.
          </>
        ) : (
          <>
            {' '}
            el permiso <span className='font-semibold'>
              {permission_name}
            </span>{' '}
            para el proveedor{' '}
            <span className='font-semibold'>{provider_name}</span>.
          </>
        )}
        {pointsMessage && (
          <span>
            &nbsp;{pointsMessage}&nbsp;
            <span className={pointsClass}>{permission_points}</span>
            &nbsp;puntos.
          </span>
        )}
        {justification && (
          <span>
            Con la siguiente declaración:
            <span className='italic'>"{justification}"</span>
          </span>
        )}
      </p>
      <p className='text-[0.6rem] text-gray-500 mt-1'>{created_at}</p>
    </div>
  )
}
