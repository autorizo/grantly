import { ButtonHTMLAttributes } from 'react'
import { PermissionStatus } from 'stores'

export type ToggleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  status: PermissionStatus
}
