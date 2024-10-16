import { Set } from 'types/zustand'
import { PermissionStatus, ProviderState } from './useProviders.types'

export const togglePermission =
  (set: Set<ProviderState>) =>
  (
    permissionId: string,
    status: PermissionStatus,
    isAnActiveProvider: boolean
  ): void =>
    set((state: ProviderState) => {
      if (!isAnActiveProvider) {
        // Find the provider in the inactive list
        const providerIndex = state.providers.inactive.findIndex(provider =>
          provider.permissions.some(
            permission => permission.id === permissionId
          )
        )

        if (providerIndex !== -1) {
          const provider = state.providers.inactive[providerIndex]

          // Update the permission status
          const permissionIndex = provider.permissions.findIndex(
            p => p.id === permissionId
          )
          if (permissionIndex !== -1) {
            provider.permissions[permissionIndex].status = status
            provider.permissions[permissionIndex].createdAt =
              new Date().toISOString()

            // Calculate total points for the provider
            provider.total = provider.permissions.reduce(
              (total, permission) =>
                total +
                (permission.status === PermissionStatus.Active
                  ? permission.points
                  : 0),
              0
            )

            // Move the provider to the active list
            // Instead of returning a new value, modify the draft
            state.providers.active.push({ ...provider })
            state.providers.inactive.splice(providerIndex, 1) // Remove from inactive
          }
        }
      } else {
        // Update the permission status for an active provider
        state.providers.active.forEach(provider => {
          provider.permissions.forEach(permission => {
            if (permission.id === permissionId) {
              permission.status = status
              permission.createdAt = new Date().toISOString()
              provider.total = provider.permissions.reduce(
                (total, permission) =>
                  total +
                  (permission.status === PermissionStatus.Active
                    ? permission.points
                    : 0),
                0
              )
            }
          })
        })
      }
    })
