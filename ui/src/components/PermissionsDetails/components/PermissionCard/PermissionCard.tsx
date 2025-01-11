import cn from 'classnames'
import { PermissionCardProps } from './PermissionCard.types'
import {
  IconPermission,
  LeftArrowIcon,
  Modal,
  StarActiveIcon,
  StarIcon,
  useModal,
} from 'components'
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
  const { isOpen, closeModal, openModal } = useModal()

  // Check if the provider status is blocked
  const isProviderBlocked = providerStatus === 'blocked'

  const handleToggle = () => {
    togglePermission(id)
  }

  return (
    <div className='flex relative'>
      <div
        className={cn(
          'flex justify-between gap-2 rounded-lg shadow-lg p-4 transition-width duration-300 w-full'
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
          {!isProviderBlocked && (
            <button
              onClick={handleToggle}
              className={cn(
                'flex items-center justify-center absolute right-4 top-4 focus:outline-none bg-opacity-30 rounded-full transition-all duration-200 ease-in-out shadow-md text-white shadow-slate-400',
                {
                  'bg-red-500 bg-opacity-90': status === 'active',
                  'bg-green-500 shadow-slate-300 bg-opacity-90 border-none':
                    status === 'inactive',
                }
              )}
              aria-label={
                status === 'active'
                  ? 'Deactivate permission'
                  : 'Activate permission'
              }
            >
              {status === 'active' ? (
                <div className='flex items-center gap-1 p-2'>
                  <StarIcon /> -{points}
                </div>
              ) : (
                <div className='flex items-center gap-1 p-2'>
                  <StarActiveIcon /> +{points}
                </div>
              )}
            </button>
          )}
        </div>
      </div>

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
