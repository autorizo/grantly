import {
  IconMapTypes,
} from 'components'
import { PermissionCard } from './components'
import { PermissionsDetailsProps } from './PermissionsDetails.types'
import { formatDate } from 'utils'

export const PermissionsDetails = ({
  permissions,
  togglePermission,
  providerStatus
}: PermissionsDetailsProps) => {
  return (
    <div className='flex flex-col gap-4 border-t-2 pt-4 pb-4'>
      {permissions.map(
        ({
          name,
          description,
          image,
          updatedAt,
          status,
          points,
          id,
          pdfPath,
        }) => (
          <PermissionCard
            key={description}
            name={name}
            description={description}
            image={image as IconMapTypes}
            updatedAt={formatDate(updatedAt)}
            status={status}
            points={points}
            id={id}
            pdfPath={pdfPath}
            togglePermission={togglePermission}
            providerStatus={providerStatus}
          />
        )
      )}
    </div>
  )
}
