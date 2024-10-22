import { TogglePermissionFunction } from 'components'
import { Permission, ProviderStatus } from 'stores'

export type PermissionsDetailsProps = {
  permissions: Permission[]
  togglePermission: TogglePermissionFunction
  providerStatus: ProviderStatus
}
