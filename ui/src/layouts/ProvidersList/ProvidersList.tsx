import { ProviderCard, ToastType } from 'components'
import { useMutation } from 'react-query'
import { togglePermissionAPI } from 'servers'
import { PermissionStatus, Provider, useProviders } from 'stores'
import { ProvidersListProps } from './ProvidersList.types'
import { router } from 'router'
import { useToast } from 'contexts'

const userId = process.env.REACT_APP_USER_ID ?? ''
const labelMap = {
  [PermissionStatus.Active]: 'activado',
  [PermissionStatus.Inactive]: 'desactivado',
  [PermissionStatus.Blocked]: 'bloqueado  ',
}
export const ProvidersList = ({ isActive }: ProvidersListProps) => {
  const { providers, togglePermission } = useProviders()
  const { showToast } = useToast()

  // Determine the providers to show based on the prop
  const displayedProviders = isActive ? providers.active : providers.inactive

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
        <div className='flex justify-center items-center gap-2 flex-col'>
          <h2 className='text-2xl font-semibold text-gray-600'>
            No hay proveedores nuevos
          </h2>
        </div>
      )}
    </div>
  )
}
