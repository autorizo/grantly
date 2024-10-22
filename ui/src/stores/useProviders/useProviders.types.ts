export type Provider = {
  id: string
  name: string
  description: string
  total: number
  status: ProviderStatus
  permissions: Permission[]
}

export enum ProviderStatus {
  Enabled = 'enabled',
  Blocked = 'blocked',
}
export enum PermissionStatus {
  Active = 'active',
  Inactive = 'inactive',
  Blocked = 'blocked',
}

export type Permission = {
  description: string
  id: string
  image: string
  justification: string
  name: string
  points: number
  status: PermissionStatus
  updatedAt: string
  pdfPath: string
}
export type Providers = {
  active: Provider[]
  inactive: Provider[]
  blocked: Provider[]
}
export type ProviderState = {
  providers: Providers
  togglePermission: (
    permissionId: string,
    status: PermissionStatus,
    isAnActiveProvider: boolean
  ) => void
  setProviders: (providers: Provider[]) => void
  toggleProvider: (providerId: string, status: ProviderStatus) => void
}
