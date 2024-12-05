import React, { useRef, useState } from 'react'

interface ProfileImageProps {
  image?: string
  profilePhoto?: string
  onImageChange?: (newImage: string) => void // Función para manejar el cambio de imagen
}

export const ProfileImage = ({
  image,
  profilePhoto,
  onImageChange,
}: ProfileImageProps) => {
  const [currentImage, setCurrentImage] = useState<string | undefined>(
    image || profilePhoto
  ) // Estado para la imagen actual
  const fileInputRef = useRef<HTMLInputElement>(null) // Ref para el input de tipo file

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

      // Llamamos a la función para cambiar la imagen si es necesario
      onImageChange?.(imageUrl)
    }
    reader.readAsDataURL(file) // Lee el archivo como una URL de datos
  }

  return (
    <div className='flex justify-center mb-6'>
      {currentImage ? (
        <img
          src={currentImage}
          alt='Perfil'
          className='w-20 h-20 rounded-full object-cover cursor-pointer'
          onClick={handleImageClick} // Abre el cuadro de selección de archivo
        />
      ) : (
        <div
          className='w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer'
          onClick={handleImageClick} // Abre el cuadro de selección de archivo
        >
          <span className='text-white text-xl'>👤</span>
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
