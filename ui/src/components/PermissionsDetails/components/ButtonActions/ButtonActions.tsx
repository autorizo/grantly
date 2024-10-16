import cn from 'classnames'
import { ButtonActionsProps } from './ButtonActions.types'
import { Fragment } from 'react/jsx-runtime'
import { PermissionStatus } from 'stores'
import { ToggleButton } from './components'
import { BlockIcon, CheckIcon } from 'components'

export const ButtonActions = ({
  status,
  handleOpenModal,
  id,
  togglePermission,
}: ButtonActionsProps) => {
  const buttonClassName = cn(
    'text-xs  font-semibold flex items-center gap-1 border-[1.35px] rounded-md p-1',
    {
      'text-green-500 border-green-500': status === PermissionStatus.Blocked,
      'text-red-500 border-red-500': status !== PermissionStatus.Blocked,
    }
  )
  const handleClick = () => {
    handleOpenModal(id, status)
  }
  return (
    <div className='flex flex-col justify-between'>
      <button onClick={handleClick} className={buttonClassName}>
        {status !== PermissionStatus.Blocked ? (
          <Fragment>
            <BlockIcon className='w-5 h-5' /> <span>Bloquear</span>
          </Fragment>
        ) : (
          <Fragment>
            <CheckIcon className='w-4 h-4' /> <span>Desbloquear</span>
          </Fragment>
        )}
      </button>
      {status !== PermissionStatus.Blocked && (
        <ToggleButton status={status} onClick={() => togglePermission(id)} />
      )}
    </div>
  )
}
