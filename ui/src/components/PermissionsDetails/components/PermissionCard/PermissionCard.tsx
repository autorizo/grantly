import cn from 'classnames'
import { PermissionCardProps } from './PermissionCard.types'
import { IconPermission, LeftArrowIcon, Modal, useModal } from 'components'
import { PermissionState } from '..'
import { useState } from 'react'
import { useSwipe } from 'hooks'
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'

export const PermissionCard = ({
  description,
  id,
  image,
  name,
  points,
  status,
  updatedAt,
  pdfPath,
  togglePermission,
  providerStatus, // Receive providerStatus prop
}: PermissionCardProps) => {
  const [isSwiped, setIsSwiped] = useState(false)
  const { isOpen, closeModal, openModal } = useModal()

  // Check if the provider status is blocked
  const isProviderBlocked = providerStatus === 'blocked'

  const { swipeDirection, resetSwipeDirection, autoLeftSwipe, ...props } =
    useSwipe({
      onSwipedLeft: () => {
        if (!isProviderBlocked) {
          setIsSwiped(true)
        }
      },
      onSwipedRight: () => {
        if (!isProviderBlocked) {
          resetSwipeDirection()
          setIsSwiped(false)
        }
      },
    })

  const showButton = !(swipeDirection === null || swipeDirection === 'right')

  const handleToggle = () => {
    togglePermission(id)
    resetSwipeDirection()
    setIsSwiped(false)
  }

  const handleOpenRight = () => {
    if (isSwiped) {
      setIsSwiped(false)
      resetSwipeDirection()
    } else {
      autoLeftSwipe()
    }
  }

  return (
    <div className='flex relative'>
      <div
        {...props}
        className={cn(
          'flex justify-between gap-2 rounded-lg shadow-lg p-4 transition-width duration-300 w-full',
          {
            '-translate-x-1/4': isSwiped && swipeDirection === 'left',
            'translate-x-0': !isSwiped,
          }
        )}
      >
        <div className='grid grid-cols-[3rem_1fr_3rem] gap-2 w-full'>
          <div className='justify-self-center'>
            <IconPermission size='lg' image={image} />
          </div>
          <div className='flex flex-col'>
            <h3 className='text-md font-semibold'>{name}</h3>
            {!isProviderBlocked && (
              <PermissionState status={status} points={points} />
            )}
            <p className='text-xs text-gray-800'>{description}</p>
            {!isProviderBlocked && updatedAt && (
              <p className='text-xs text-gray-500'>Modificado {updatedAt}</p>
            )}
            <button
              onClick={() => openModal()} // Open the modal
              className='text-xs underline font-semibold text-left text-primary'
              aria-label='View Terms and Conditions'
            >
              Términos y Condiciones
            </button>
          </div>
          <div className='self-center text-6xl' onClick={handleOpenRight}>
            <LeftArrowIcon className='text-slate-700' size='md' />
          </div>
        </div>
      </div>
      {!isProviderBlocked && showButton && (
        <button
          onClick={handleToggle}
          className={cn(
            'shadow-xl border-2 border-white text-xs font-semibold text-white rounded-lg p-2 duration-500 absolute h-full top-0 right-0 transition-opacity ease-in-out opacity-0 w-20',
            {
              'bg-red-500 bg-opacity-90': status === 'active',
              'bg-green-500 bg-opacity-90': status === 'inactive',
              'opacity-100': showButton,
            }
          )}
          aria-label={
            status === 'active'
              ? 'Deactivate permission'
              : 'Activate permission'
          }
        >
          {status === 'active' ? 'Desactivar' : 'Activar'}
        </button>
      )}
      <Modal isOpen={isOpen} onClose={closeModal} fullScreen>
        <div className='flex overflow-y-auto'>
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
          >
            <Viewer
              defaultScale={SpecialZoomLevel.PageWidth}
              fileUrl={`${process.env.REACT_APP_BE_URL}/proxy-pdf?pdfPath=${pdfPath}`}
            />
          </Worker>
        </div>
      </Modal>
    </div>
  )
}
