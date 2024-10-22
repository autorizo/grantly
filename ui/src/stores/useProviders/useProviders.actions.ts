import { Set } from 'types/zustand'
import {
  PermissionStatus,
  ProviderState,
  ProviderStatus,
} from './useProviders.types'

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
            provider.permissions[permissionIndex].updatedAt =
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
              permission.updatedAt = new Date().toISOString()
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

export const toggleProvider =
  (set: Set<ProviderState>) =>
  (providerId: string, status: ProviderStatus): void =>
    set((state: ProviderState) => {
      // Check if the provider is in the active list
      const activeProviderIndex = state.providers.active.findIndex(
        provider => provider.id === providerId
      )

      // Check if the provider is in the inactive list
      const inactiveProviderIndex = state.providers.inactive.findIndex(
        provider => provider.id === providerId
      )

      // If the provider is active
      if (activeProviderIndex !== -1) {
        const provider = state.providers.active[activeProviderIndex]

        // If the status is blocked, move to the blocked list
        if (status === ProviderStatus.Blocked) {
          state.providers.blocked.push({ ...provider, status })
          state.providers.active.splice(activeProviderIndex, 1) // Remove from active
        } else {
          // Update the provider status to the new status (if not blocked)
          provider.status = status
        }
      }
      // If the provider is inactive
      else if (inactiveProviderIndex !== -1) {
        const provider = state.providers.inactive[inactiveProviderIndex]

        // If the status is set to active, move to the active list
        if (status === ProviderStatus.Enabled) {
          provider.status = status // Update the status
          state.providers.active.push({ ...provider })
          state.providers.inactive.splice(inactiveProviderIndex, 1) // Remove from inactive
        } else if (status === ProviderStatus.Blocked) {
          // Move to blocked if status is blocked
          state.providers.blocked.push({ ...provider })
          state.providers.inactive.splice(inactiveProviderIndex, 1) // Remove from inactive
          provider.status = status // Update the status
        }
      }
      // If the provider is not in either list
      else {
        const blockedProviderIndex = state.providers.blocked.findIndex(
          provider => provider.id === providerId
        )
        const provider = state.providers.blocked[blockedProviderIndex]
        state.providers.blocked.splice(blockedProviderIndex, 1) // Remove from active
        // If setting status to active, it should be handled as a new addition
        if (status === ProviderStatus.Enabled) {
          const newProvider = { ...provider, status }
          state.providers.active.push(newProvider) // Add to active list
        }
      }
    })
