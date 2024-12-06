import { NavigationTabs, ProviderCard, ToastType } from 'components'
import { useMutation } from 'react-query'
import { togglePermissionAPI } from 'servers'
import { PermissionStatus, Provider, Providers, useProviders } from 'stores'
import { ProvidersListProps, ProviderType } from './ProvidersList.types'
import { router } from 'router'
import { useToast } from 'contexts'
import { useAuth } from 'contexts'

const getProviders = (providerType: ProviderType, providers: Providers) => {
  switch (providerType) {
    case ProviderType.ACTIVE:
      return providers.active
    case ProviderType.INACTIVE:
      return providers.inactive
    case ProviderType.BLOCKED:
      return providers.blocked
    default:
      return []
  }
}

const labelMap = {
  [PermissionStatus.Active]: 'activado',
  [PermissionStatus.Inactive]: 'desactivado',
  [PermissionStatus.Blocked]: 'bloqueado  ',
}
export const ProvidersList = ({ providerType }: ProvidersListProps) => {
  const { providers, togglePermission } = useProviders()
  const { showToast } = useToast()
  const { session } = useAuth() // Get profilePhoto from context
  const userId = session?.user?.id ?? ''

  // Determine the providers to show based on the prop
  const displayedProviders = getProviders(providerType, providers)

  const { isLoading: isToggling, mutate: handleToggle } = useMutation(
    ({
      userId,
      permissionId,
      state,
      justification,
      isAnActiveProvider,
    }: {
      userId: string
      permissionId: string
      state: PermissionStatus
      justification?: string
      isAnActiveProvider: boolean
    }) =>
      togglePermissionAPI(
        userId,
        permissionId,
        state,
        isAnActiveProvider,
        justification
      ),
    {
      onSuccess: ({ permissionId, status, isAnActiveProvider }) => {
        togglePermission(permissionId, status, isAnActiveProvider)
        if (!isAnActiveProvider) router.navigate('/active')
        // generate label for bloqued, activated, deactivated
        const label = labelMap[status as PermissionStatus]
        const toastType =
          status === PermissionStatus.Active
            ? ToastType.SUCCESS
            : ToastType.ERROR
        // get points and show in toast active gained, others lost
        const points = providers.active
          .map(provider => provider.permissions)
          .flat()
          .find(permission => permission.id === permissionId)?.points
        const message = points
          ? `Ha ${status === PermissionStatus.Active ? 'ganado' : 'perdido'} ${Math.abs(
              points
            )} puntos`
          : ''
        showToast(`Permiso ${label} exitosamente. ${message}`, toastType)
      },
    }
  )

  const handleClick = (
    provider: Provider,
    permissionId: string,
    justification?: string
  ) => {
    if (isToggling) return

    const foundActiveProvider = providers.active.find(p => p.id === provider.id)
    const foundInactiveProvider = providers.inactive.find(
      p => p.id === provider.id
    )
    const foundProvider = foundActiveProvider || foundInactiveProvider

    const isAnActiveProvider = !!foundActiveProvider

    if (!foundProvider) {
      console.error(`Provider with ID ${provider.id} not found.`)
      return
    }

    const permission = foundProvider.permissions.find(
      p => p.id === permissionId
    )

    if (!permission) {
      console.error(
        `Permission with ID ${permissionId} not found for provider ${provider.id}.`
      )
      return
    }

    let newStatus =
      permission.status === PermissionStatus.Active
        ? PermissionStatus.Inactive
        : PermissionStatus.Active

    if (justification) {
      newStatus =
        permission.status === PermissionStatus.Blocked
          ? PermissionStatus.Active
          : PermissionStatus.Blocked
    }

    handleToggle({
      userId,
      permissionId,
      state: newStatus,
      justification,
      isAnActiveProvider,
    })
  }
  return (
    <div className='flex justify-center items-center gap-2 flex-col'>
      {/* Navigation Tabs */}
      <NavigationTabs activeTab='/active' />

      {displayedProviders.map((provider, index) => (
        <ProviderCard
          togglePermission={(permissionId, justification) =>
            handleClick(provider, permissionId, justification)
          }
          key={index}
          provider={provider}
        />
      ))}
      {displayedProviders.length === 0 && (
        <div className='text-center text-gray-500'>
          Sin Proveedores para mostrar
        </div>
      )}
    </div>
  )
}
