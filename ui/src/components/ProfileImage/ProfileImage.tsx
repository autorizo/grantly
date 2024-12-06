import { ProfileIcon } from 'components'
import React, { useRef, useState, useEffect } from 'react'
import { ProfileImageProps } from './ProfileImage.types'

export const ProfileImage = ({
  image,
  profilePhoto,
  onImageChange,
  handleUploadImage,
}: ProfileImageProps) => {
  const [currentImage, setCurrentImage] = useState<string | undefined>(
    image || profilePhoto
  ) // Estado para la imagen actual
  const [hasUploadedImage, setHasUploadedImage] = useState<boolean>(false) // Estado para verificar si el usuario subió una imagen
  const fileInputRef = useRef<HTMLInputElement>(null) // Ref para el input de tipo file

  // Update the current image if the parent changes the image prop
  useEffect(() => {
    if (image || profilePhoto) {
      setCurrentImage(image || profilePhoto)
      setHasUploadedImage(false) // Reset the uploaded flag if image comes from parent
    }
  }, [image, profilePhoto])

  const handleImageClick = () => {
    // Abre el cuadro de diálogo de archivos al hacer clic en la imagen
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const imageUrl = reader.result as string // URL de la imagen cargada

      // Actualizamos el estado local de la imagen
      setCurrentImage(imageUrl)
      setHasUploadedImage(true) // Marca como que el usuario subió una nueva imagen

      // Llamamos a la función para cambiar la imagen si es necesario
      onImageChange?.(imageUrl)
    }
    reader.readAsDataURL(file) // Lee el archivo como una URL de datos
  }

  const handleChangeImage = () => {
    // Llama a la función para subir la imagen
    handleUploadImage(fileInputRef.current?.files?.[0] as File)
  }

  return (
    <div className='flex justify-center mb-6'>
      {currentImage ? (
        <div className='flex flex-col gap-2 items-center'>
          <img
            src={currentImage}
            alt='Perfil'
            className='w-20 h-20 rounded-full object-cover cursor-pointer'
            onClick={handleImageClick} // Abre el cuadro de selección de archivo
          />
          {/* Enlace para cambiar la foto, solo se muestra si el usuario sube una nueva imagen */}
          {hasUploadedImage && (
            <span className='text-sm text-primary' onClick={handleChangeImage}>
              Cambiar foto
            </span>
          )}
        </div>
      ) : (
        <div
          className='w-20 h-20 bg-white rounded-full flex items-center justify-center cursor-pointer'
          onClick={handleImageClick} // Abre el cuadro de selección de archivo
        >
          <ProfileIcon className='w-16 h-16 text-primary' />
        </div>
      )}

      {/* Input oculto para seleccionar el archivo de imagen */}
      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        accept='image/*'
        onChange={handleFileChange} // Al seleccionar un archivo, cambiar la imagen
      />
    </div>
  )
}
