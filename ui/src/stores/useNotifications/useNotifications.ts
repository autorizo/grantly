import { create } from 'zustand'
import { initialState } from './initialState'
import { Notification, NotificationState } from './useNotification.types'
import { immer } from 'zustand/middleware/immer'

export const useNotification = create(
  immer<NotificationState>(set => ({
    notifications: initialState,
    setNotifications: (notifications: Notification[]) =>
      set(() => ({ notifications })),
  }))
)
