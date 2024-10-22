import { useState, useEffect } from 'react'
import { DrawerProps } from './Drawer.types'
import { CloseIcon } from 'components'

export const Drawer = ({
  isOpen = false,
  onClose,
  children,
  position = 'bottom',
}: DrawerProps) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(isOpen)

  // Whenever the external state changes, update the drawer state
  useEffect(() => {
    setDrawerIsOpen(isOpen)
  }, [isOpen])

  const closeDrawer = () => {
    setDrawerIsOpen(false)
    if (onClose) {
      onClose() // Trigger callback to notify parent
    }
  }

  return (
    <div className='relative z-20'>
      {/* Drawer */}
      <div
        className={`z-30 fixed w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-scroll ${
          position === 'bottom'
            ? `${drawerIsOpen ? 'translate-y-0' : 'translate-y-full'} h-5/6 left-0 bottom-0`
            : `${drawerIsOpen ? 'translate-x-0' : '-translate-x-full'} h-full left-0 top-0 w-10/12`
        }`}
      >
        <div className='p-4'>
          <button onClick={closeDrawer}>
            <CloseIcon className='h-6 w-6 text-gray-700' />
          </button>
          {/* Drawer content */}
          <div className='mt-4'>{children}</div>
        </div>
      </div>

      {/* Overlay (optional, for when the drawer is open) */}
      {drawerIsOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50'
          onClick={closeDrawer}
        ></div>
      )}
    </div>
  )
}
