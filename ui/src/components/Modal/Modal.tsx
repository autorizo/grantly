import ReactDOM from 'react-dom'
import { ModalProps } from './Modal.types'
import { CloseIcon } from 'components'
import classNames from 'classnames'
export const Modal = ({
  isOpen,
  onClose,
  title,
  fullScreen = false,
  children,
}: ModalProps) => {
  if (!isOpen) return null
  const modalClass = fullScreen ? 'py-6 w-full h-full' : 'p-6 w-11/12 md:w-1/3'
  const className = classNames('bg-white rounded-lg shadow-lg', modalClass)
  const buttonClass = classNames({
    'px-6': fullScreen,
  })
  return ReactDOM.createPortal(
    <div
      className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div className={className} onClick={e => e.stopPropagation()}>
        <div className='flex flex-col gap-4'>
          <button className={buttonClass} onClick={onClose}>
            <CloseIcon className='w-6 h-6' />
          </button>
          {title && <h2 className='text-lg font-semibold'>{title}</h2>}
        </div>
        {children}
      </div>
    </div>,
    document.body
  )
}
