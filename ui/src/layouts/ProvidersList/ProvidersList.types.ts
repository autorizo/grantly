export type ProvidersListProps = {
  providerType: ProviderType
}

export enum ProviderType {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BLOCKED = 'blocked',
}
