import cn from 'classnames'
import {
  BlockIcon,
  Button,
  CheckIcon,
  Modal,
  StarActiveIcon,
  ToastType,
  useModal,
} from 'components'
import { ProviderHeaderProps } from './ProviderHeader.types'
import { Fragment } from 'react/jsx-runtime'
import { ProviderStatus, useProviders } from 'stores'
import { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { toggleProviderAPI } from 'servers'
import { useToast } from 'contexts'

export const ProviderHeader = ({
  id,
  name,
  total,
  description,
  status,
  isInDetail = false,
  closeParentDrawer,
}: ProviderHeaderProps) => {
  const { isOpen, closeModal, openModal } = useModal()
  const [isBlocking, setIsBlocking] = useState(true)
  const [justification, setJustification] = useState('')
  const [error, setError] = useState('') // Error message state
  const [displayedTotal, setDisplayedTotal] = useState(total)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const { toggleProvider } = useProviders()
  const { showToast } = useToast()

  const { mutate: toggleProviderHandler } = useMutation(
    (args: { providerId: string; justification: string }) =>
      toggleProviderAPI(args.providerId, args.justification),
    {
      onSuccess: ({ providerId, status }) => {
        toggleProvider(providerId, status)
      },
    }
  )

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
      return
    }

    let currentValue = displayedTotal
    setIsAnimating(true)
    const interval = setInterval(() => {
      if (currentValue === total) {
        clearInterval(interval)
      } else {
        currentValue =
          currentValue < total ? currentValue + 1 : currentValue - 1
        setDisplayedTotal(currentValue)
      }
    }, 50)

    const timeout = setTimeout(() => setIsAnimating(false), 600)
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [total])

  const handleToggleProvider = () => {
    if (!justification.trim()) {
      setError('La justificación no puede estar vacía.') // Show error if empty
      return
    }

    setError('') // Clear error if validation passes
    if (id) {
      toggleProviderHandler({ providerId: id, justification })
      setJustification('')
      showToast(
        `El proveedor ha sido ${isBlocking ? 'bloqueado' : 'desbloqueado'}`,
        ToastType.INFO
      )
      closeModal()
      closeParentDrawer && closeParentDrawer()
    }
  }

  const handleOpenModal = () => {
    setIsBlocking(status !== ProviderStatus.Blocked)
    openModal()
  }

  const buttonClass = cn(
    'text-xs font-semibold flex items-center gap-1 border-[1.35px] rounded-md p-1 shadow-md',
    {
      'text-red-500 border-red-500': status !== ProviderStatus.Blocked,
      'text-green-500 border-green-500': status === ProviderStatus.Blocked,
    }
  )

  return (
    <div className='flex flex-col gap-2 border-b pb-2'>
      <div className='flex gap-4 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <img
            src={`/images/${name}.png`}
            alt={name}
            className={cn('rounded-full w-10 h-10 object-scale-down', {
              grayscale: status === ProviderStatus.Blocked,
            })}
          />
          <h2 className='text-xl font-semibold'>{name}</h2>
        </div>
        <div
          className={cn(
            'flex items-center gap-2 border-primary border-2 px-1.5 py-0.5 rounded-full',
            {
              grayscale: status === ProviderStatus.Blocked,
            }
          )}
        >
          <StarActiveIcon className='h-7 w-7 text-yellow-500' />
          <p className='text-md font-semibold text-primary'>
            {displayedTotal}
            <span className='hidden sm:contents'> Puntos</span>
          </p>
        </div>
      </div>
      <p className='text-sm sm:text-md text-gray-700'>{description}</p>
      <div className='flex justify-end self-end w-2/4'>
        {isInDetail && (
          <button onClick={handleOpenModal} className={buttonClass}>
            {status !== ProviderStatus.Blocked ? (
              <Fragment>
                <BlockIcon className='w-5 h-5' /> <span>Bloquear</span>
              </Fragment>
            ) : (
              <Fragment>
                <CheckIcon className='w-4 h-4' /> <span>Desbloquear</span>
              </Fragment>
            )}
          </button>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={`Justificación para ${isBlocking ? 'bloquear' : 'desbloquear'}`}
      >
        <div className='flex flex-col gap-4'>
          <textarea
            className='border-[1.35px] border-gray-300 rounded-md p-2'
            placeholder='Escribe tu justificación'
            value={justification}
            onChange={e => setJustification(e.target.value)}
          />
          {error && <p className='text-red-500 text-sm'>{error}</p>}{' '}
          {/* Show error message */}
          <Button onClick={handleToggleProvider}>Enviar</Button>
        </div>
      </Modal>
    </div>
  )
}
