import { create } from 'zustand'
import { initialState } from './initialState'
import { Provider, ProviderState } from './useProviders.types'
import { togglePermission } from './useProviders.actions'
import { immer } from 'zustand/middleware/immer'

export const useProviders = create(
  immer<ProviderState>(set => ({
    providers: initialState,
    togglePermission: togglePermission(set),
    setProviders: (providers: Provider[]) => set(() => ({ providers })),
  }))
)
