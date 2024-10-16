import React, { createContext, useContext, useState, useCallback } from 'react'
import { Toast, ToastContainer, ToastType } from 'components'
import { ToastContextProps } from './ToastContext.types'

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback(
    (message: string, type: ToastType = ToastType.INFO) => {
      const id = Date.now().toString() // Unique ID for each toast
      setToasts(prevToasts => [...prevToasts, { id, message, type }])

      // Remove toast after 3 seconds
      setTimeout(() => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id))
      }, 3000)
    },
    []
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}
