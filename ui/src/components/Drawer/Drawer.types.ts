import { PropsWithChildren } from 'react'

export type DrawerProps = PropsWithChildren & {
    isOpen: boolean
    onClose: () => void
    position?: 'bottom' | 'left'
}
