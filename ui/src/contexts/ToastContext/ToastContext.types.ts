import { Toast } from "components"

export type ToastContextProps = {
  showToast: (message: string, type?: Toast['type']) => void
}
