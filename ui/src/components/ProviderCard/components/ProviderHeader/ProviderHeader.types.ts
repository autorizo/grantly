import { ProviderStatus } from 'stores'

export type ProviderHeaderProps = {
  id: string
  name: string
  total: number
  description: string
  status: ProviderStatus
  isInDetail?: boolean
}
