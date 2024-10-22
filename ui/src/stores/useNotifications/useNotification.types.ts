export type Notification = {
  provider_name: string
  permission_name: string
  action: NotificationAction
  justification: string
  permission_points: number
  created_at: string
}

export enum NotificationAction {
  Active = 'active_permission',
  Inactive = 'inactive_permission',
  Blocked = 'block_provider',
  Unblocked = 'unblock_provider',
}

export type NotificationState = {
  notifications: Notification[]
  setNotifications: (notifications: Notification[]) => void
}
