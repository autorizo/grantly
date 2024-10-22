import { IconMapTypes } from "components";
import { PermissionStatus, ProviderStatus } from "stores";

export type PermissionCardProps = {
    description: string
    id: string
    image: IconMapTypes
    name: string
    points: number
    status: PermissionStatus
    updatedAt: string
    pdfPath: string
    togglePermission: (id: string) => void
    handleClick: (pdfPath: string) => () => void
    providerStatus: ProviderStatus
};