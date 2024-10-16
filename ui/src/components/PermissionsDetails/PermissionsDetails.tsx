import React, { Fragment, useState } from 'react'
import {
  BlockIcon,
  Button,
  CheckIcon,
  IconMapTypes,
  IconPermission,
} from 'components'
import { ButtonActions, PermissionState } from './components'
import { PermissionsDetailsProps } from './PermissionsDetails.types'
import { formatDate } from 'utils'
import { Modal } from 'components'
import { useModal } from 'components'
import { PermissionStatus } from 'stores'

export const PermissionsDetails = ({
  permissions,
  togglePermission,
}: PermissionsDetailsProps) => {
  const { isOpen, closeModal, openModal } = useModal()
  const [justification, setJustification] = useState('')
  const [selectedPermissionId, setSelectedPermissionId] = useState<
    string | null
  >(null)
  const [isBlocking, setIsBlocking] = useState(true) // New state to track the action

  const handleTogglePermission = () => {
    if (selectedPermissionId && justification) {
      togglePermission(selectedPermissionId, justification) // Pass isBlocking to the toggle function
      setJustification('')
      setSelectedPermissionId(null)
      closeModal()
    }
  }

  const handleOpenModal = (id: string, status: PermissionStatus) => {
    setSelectedPermissionId(id)
    setIsBlocking(status !== PermissionStatus.Blocked) // Determine if blocking or unblocking
    openModal()
  }

  const handleClick = (pdfPath: string) => () => {
    window.open(pdfPath, '_blank')
  }
  return (
    <div className='flex flex-col gap-4 border-t-2 pt-4 pb-4'>
      {permissions.map(
        ({
          name,
          description,
          image,
          createdAt,
          status,
          points,
          id,
          pdfPath,
        }) => (
          <div
            className='flex justify-between gap-2 rounded-lg shadow-lg p-4'
            key={description}
          >
            <div className='flex gap-2'>
              <IconPermission image={image as IconMapTypes} />
              <div className='flex flex-col'>
                <h3 className='text-md font-semibold'>{name}</h3>
                <PermissionState status={status} points={points} />
                <p className='text-xs text-gray-800'>{description}</p>
                {createdAt && (
                  <p className='text-xs text-gray-500'>
                    Modificado {formatDate(createdAt)}
                  </p>
                )}
                <button
                  onClick={handleClick(pdfPath)}
                  className='text-xs underline font-semibold text-left text-primary'
                >
                  Terminos y Condiciones
                </button>
              </div>
            </div>
            <ButtonActions
              status={status}
              handleOpenModal={handleOpenModal}
              id={id}
              togglePermission={togglePermission}
            />
          </div>
        )
      )}
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
          <Button onClick={handleTogglePermission}>Enviar</Button>
        </div>
      </Modal>
    </div>
  )
}
