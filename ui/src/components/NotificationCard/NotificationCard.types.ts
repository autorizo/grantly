import { NotificationAction } from "stores"

export type NotificationCardProps = {
  provider_name: string
  permission_name: string
  justification: string
  created_at: string
  permission_points: number
  action: NotificationAction
}
