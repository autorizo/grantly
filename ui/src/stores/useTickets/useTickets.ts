import { create } from 'zustand'
import { initialState } from './initialState'
import { Categories, TicketsState } from './useTickets.types'
import { immer } from 'zustand/middleware/immer'

export const useTickets = create(
  immer<TicketsState>(set => ({
    categories: initialState,
    userTickets: initialState,
    setTickets: (categories: Categories[]) => set(() => ({ categories })),
    setUserTickets: (tickets: Categories[]) => set(() => ({ tickets })),
  }))
)
