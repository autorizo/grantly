import { NotificationCard } from 'components'
import { useAuth } from 'contexts'
import { useFetchNotifications } from 'hooks'
import { useNotification } from 'stores'
import { formatDate } from 'utils'

export const Notifications = () => {
  const { session } = useAuth() ?? {}
  const userId = session?.user?.id ?? ''
  useFetchNotifications(userId)
  const { notifications } = useNotification()

  return (
    <div className='p-1 flex flex-col gap-1'>
      {notifications.map(
        (
          {
            provider_name,
            created_at,
            permission_name,
            justification,
            action,
            permission_points,
          },
          index
        ) => (
          <NotificationCard
            key={index}
            provider_name={provider_name}
            permission_name={permission_name}
            justification={justification}
            created_at={formatDate(created_at)}
            permission_points={permission_points}
            action={action}
          />
        )
      )}
      {notifications.length === 0 && (
        <div className='text-center text-gray-500'>
          No tienes notificaciones
        </div>
      )}
    </div>
  )
}
