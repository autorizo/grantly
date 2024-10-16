import ReactDOM from 'react-dom'
import { ModalProps } from './Modal.types'
import { CloseIcon } from 'components'

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div
      className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 '
        onClick={e => e.stopPropagation()}
      >
        <div className='flex flex-col gap-4'>
          <button className='' onClick={onClose}>
            <CloseIcon className='w-6 h-6' />
          </button>
          <h2 className='text-lg font-semibold'>{title}</h2>
        </div>
        {children}
      </div>
    </div>,
    document.body
  )
}
