import { IconMapTypes, TogglePermissionFunction } from 'components'
import { PermissionStatus } from 'stores'

export type PermissionButtonProps = {
  status: PermissionStatus
  id: string
  image: IconMapTypes
  togglePermission: TogglePermissionFunction
}
