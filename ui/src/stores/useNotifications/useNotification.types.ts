export type Notification = {
  provider_name: string
  permission_name: string
  status: string
  justification: string
  permission_points: number
  created_at: string
}

export type NotificationState = {
  notifications: Notification[]
  setNotifications: (notifications: Notification[]) => void
}
