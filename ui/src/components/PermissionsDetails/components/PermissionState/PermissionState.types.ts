import { PermissionStatus } from 'stores'

export type PermissionStateProps = {
  status: PermissionStatus
  points: number
}
export type States = {
  enabled: boolean
  blocked: boolean
  points: number
}
