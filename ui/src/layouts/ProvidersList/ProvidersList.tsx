import { NavigationTabs, ProviderCard, ToastType } from 'components'
import { useMutation } from 'react-query'
import { togglePermissionAPI } from 'servers'
import { PermissionStatus, Provider, Providers, useProviders } from 'stores'
import { ProvidersListProps, ProviderType } from './ProvidersList.types'
import { router } from 'router'
import { useToast } from 'contexts'
import { useAuth } from 'contexts'
import { Link } from 'react-router-dom'

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
    if (!isAnActiveProvider) router.navigate('/active')
    togglePermission(permissionId, newStatus, isAnActiveProvider)

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
        <div className='flex flex-col items-center justify-center text-gray-600 space-y-4 px-8'>
          <h1 className='text-xl font-semibold text-center'>
            No hay proveedores para mostrar
          </h1>
          {providerType === ProviderType.ACTIVE && (
            <div className='text-center space-y-4'>
              <span>¡Activa proveedores para comenzar a ganar puntos!</span>
              <p>
                <Link
                  to='/inactive'
                  className='text-blue-500 hover:text-blue-700 underline transition-colors duration-300'
                >
                  Ver más proveedores
                </Link>
              </p>
            </div>
          )}

          {providerType === ProviderType.INACTIVE && (
            <div className='text-center space-y-4'>
              <p>¡Felicidades, haz ganado puntos con todos los proveedores!</p>
              <p>
                <Link
                  to='/active'
                  className='text-blue-500 hover:text-blue-700 underline transition-colors duration-300'
                >
                  Ver proveedores activos
                </Link>
              </p>
              <p className='text-xs'>
                Si no encuentras algún proveedor, busca en la sección de
                bloqueados.
              </p>
            </div>
          )}

          {providerType === ProviderType.BLOCKED && (
            <div className='text-center space-y-4'>
              <span>¡Aún no haz bloqueado ningún proveedor!</span>
              <p>
                <Link
                  to='/active'
                  className='text-blue-500 hover:text-blue-700 underline transition-colors duration-300'
                >
                  Proveedores activos
                </Link>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
