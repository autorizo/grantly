import cn from 'classnames'
import {
  BlockIcon,
  Button,
  CheckIcon,
  Modal,
  StarIcon,
  useModal,
} from 'components'
import { ProviderHeaderProps } from './ProviderHeader.types'
import { Fragment } from 'react/jsx-runtime'
import { ProviderStatus, useProviders } from 'stores'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { toggleProviderAPI } from 'servers'
import { useNavigate } from 'react-router-dom'

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
  const [isBlocking, setIsBlocking] = useState(true) // New state to track the action
  const [justification, setJustification] = useState('')
  const { toggleProvider } = useProviders()
  const navigate = useNavigate() // Hook to navigate programmatically
  
  const { mutate: toggleProviderHandler } = useMutation(
    ({
      providerId,
      justification,
    }: {
      providerId: string
      justification: string
    }) => toggleProviderAPI(providerId, justification),
    {
      onSuccess: ({ providerId, status }) => {
        toggleProvider(providerId, status)
      },
    }
  )
  const handleToggleProvider = () => {
    if (id && justification) {
      toggleProviderHandler({ providerId: id, justification })
      setJustification('')
    }
    closeModal()
    closeParentDrawer && closeParentDrawer()
  }

  const handleOpenModal = () => {
    setIsBlocking(status !== ProviderStatus.Blocked)

    openModal()
  }
  const buttonClass = cn(
    'text-xs  font-semibold flex items-center gap-1 border-[1.35px] rounded-md p-1',
    {
      'text-red-500 border-red-500': status !== ProviderStatus.Blocked,
      'text-green-500 border-green-500': status === ProviderStatus.Blocked,
    }
  )
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-4 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <img
            src={`/images/${name}.png`}
            alt={name}
            className='rounded-full w-10 h-10 object-scale-down'
          />
          <h2 className='text-xl font-semibold'>{name}</h2>
        </div>
        <div className='flex items-center gap-2 border-primary border-2 px-1.5 py-0.5 rounded-full'>
          <StarIcon className='h-6 w-6 text-yellow-500' />
          <p className='text-xs'>
            {total}
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
        title={`Justificación para ${isBlocking ? 'bloquear' : 'desbloquear'}`} // Dynamic title
      >
        <div className='flex flex-col gap-4'>
          <textarea
            className='border-[1.35px] border-gray-300 rounded-md p-2'
            placeholder='Escribe tu justificación'
            value={justification}
            onChange={e => setJustification(e.target.value)} // Update justification state
          />
          <Button onClick={handleToggleProvider}>Enviar</Button>
        </div>
      </Modal>
    </div>
  )
}
