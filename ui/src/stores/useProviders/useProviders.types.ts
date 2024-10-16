export type Provider = {
  id: string
  name: string
  description: string
  total: number
  permissions: Permission[]
}
export enum PermissionStatus {
  Active = 'active',
  Inactive = 'disabled',
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
  createdAt: string
  pdfPath: string
}

export type ProviderState = {
  providers: {
    active: Provider[]
    inactive: Provider[]
  }
  togglePermission: (
    permissionId: string,
    status: PermissionStatus,
    isAnActiveProvider: boolean
  ) => void
  setProviders: (providers: Provider[]) => void
}
