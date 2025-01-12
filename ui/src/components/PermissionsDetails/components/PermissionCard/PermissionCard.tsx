import cn from 'classnames'
import { PermissionCardProps } from './PermissionCard.types'
import {
  IconPermission,
  Modal,
  StarActiveIcon,
  StarIcon,
  useModal,
} from 'components'
import { PermissionState } from '..'
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
  providerStatus,
}: PermissionCardProps) => {
  const { isOpen, closeModal, openModal } = useModal()

  const isProviderBlocked = providerStatus === 'blocked'

  const handleToggle = () => {
    togglePermission(id)
  }

  return (
    <div className={cn('flex relative',{
      'grayscale': isProviderBlocked
    })}>
      <div
        className={cn(
          'flex justify-between gap-2 rounded-lg shadow-lg p-4 transition-width duration-300 w-full bg-gradient-to-r',
          {
            'from-green-50': status === 'active',
            'from-gray-50': status === 'inactive',
          }
        )}
      >
        <div className='flex flex-col w-full'>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center justify-between'>
              <div className='justify-self-center relative'>
                <div
                  className={cn(
                    'absolute top-0 left-0 w-6 h-6 rounded-full bg-green-300 z-0 transition-transform duration-300',
                    {
                      'bg-red-300': status === 'inactive',
                    }
                  )}
                ></div>
                <IconPermission
                  className='relative z-10'
                  size='lg'
                  image={image}
                />
              </div>
              {!isProviderBlocked && (
                <button
                  onClick={handleToggle}
                  className={cn(
                    'flex items-center gap-2 border-2 px-2 py-1 rounded-full w-17 shadow-sm transition-all duration-200 transform',
                    {
                      'border-gray-400 text-gray-400 shadow-gray-400': status === 'active',
                      'border-green-400 text-green-400 shadow-green-400': status === 'inactive',
                    }
                  )}
                >
                  <StarActiveIcon
                    className={cn('h-4 w-4', {
                      'text-green-400': status === 'inactive',
                      'text-gray-400': status === 'active',
                    })}
                  />
                  <span className='text-xs font-semibold'>
                    {status === 'active' ? 'Perder' : 'Ganar'} {points} Puntos
                  </span>
                </button>
              )}
            </div>
            <h3 className='text-sm font-semibold'>{name}</h3>
            {!isProviderBlocked && (
              <PermissionState status={status} points={points} />
            )}
            <p className='text-xs text-gray-800'>{description}</p>
            <div className='flex gap-2 items-center justify-between'>
              <button
                onClick={openModal}
                className='text-xs underline font-semibold text-left text-primary transition-colors duration-200'
              >
                Términos y Condiciones
              </button>

              {!isProviderBlocked && updatedAt && (
                <p className='text-[0.6rem] text-gray-500'>
                  Modificado {updatedAt}
                </p>
              )}
            </div>
          </div>
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
