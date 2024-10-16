import cn from 'classnames'
import { ToastContainerProps, ToastType } from './ToastContainer.types'

export const ToastContainer = ({ toasts }: ToastContainerProps) => {
  return (
    <div className='fixed top-4 right-4 space-y-3 z-50'>
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={cn(
            'p-3 rounded-lg shadow-md transition-transform transform text-xs max-w-xs',
            {
              'bg-green-500 text-white': toast.type === ToastType.SUCCESS,
              'bg-red-500 text-white': toast.type === ToastType.ERROR,
              'bg-blue-500 text-white': toast.type === ToastType.INFO,
            }
          )}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
