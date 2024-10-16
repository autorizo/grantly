import { Provider } from 'stores'

export type TogglePermissionFunction = (
  id: string,
  justification?: string
) => void

export type ProviderCardProps = {
  provider: Provider
  togglePermission: TogglePermissionFunction
}
