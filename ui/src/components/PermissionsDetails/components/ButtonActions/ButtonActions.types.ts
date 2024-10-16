import { PermissionStatus } from 'stores'

export type ButtonActionsProps = {
  status: PermissionStatus
  handleOpenModal: (id: string, status: PermissionStatus) => void
  id: string
  togglePermission: (id: string) => void
}
