import { NotificationCard } from 'components'
import { useFetchNotifications } from 'hooks'
import { PermissionStatus, useNotification } from 'stores'
import { formatDate } from 'utils'

const userId = process.env.REACT_APP_USER_ID ?? ''

export const Notifications = () => {
  useFetchNotifications(userId)
  const { notifications } = useNotification()

  return (
    <div className='p-1 flex flex-col gap-1'>
      {notifications.map(
        (
          { provider_name, created_at, permission_name, justification, action, permission_points },
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
    </div>
  )
}
