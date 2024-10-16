import { useState } from 'react'
import { ModalProps } from './Modal.types'

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    closeModal,
    openModal,
  }
}
