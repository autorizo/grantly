export type ProfileImageProps = {
  image?: string
  profilePhoto?: string
  onImageChange?: (newImage: string) => void // Función para manejar el cambio de imagen
  handleUploadImage: (imageFile: File) => void // Función para manejar la carga de la imagen
  autoChange?: boolean
}
