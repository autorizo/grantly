export type ToastContainerProps = {
  toasts: Toast[]
}

export type Toast = {
  id: string
  message: string
  type?: ToastType
}

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}
