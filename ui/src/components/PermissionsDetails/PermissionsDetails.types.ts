import { TogglePermissionFunction } from 'components'
import { Permission } from 'stores'

export type PermissionsDetailsProps = {
  permissions: Permission[]
  togglePermission: TogglePermissionFunction
}
