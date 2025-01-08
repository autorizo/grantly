import { useState, useEffect } from 'react'
import { useAuth } from 'contexts'
import { retrieveUser, updateUser, updateUserImage } from 'servers'
import { ProfileForm, ProfileImage, ToastType, User } from 'components'
import { useToast } from 'contexts'

export const Profile = () => {
  const { session, profilePhoto, uploadSessionProfilePhoto } = useAuth() // Obtener profilePhoto desde el contexto
  const { showToast } = useToast()
  const [user, setUser] = useState<User>({
    first_name: '',
    last_name: '',
    phone: '',
    phone_country_code: '',
    email: '',
  })

  const userId = session?.user?.id ?? ''

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await retrieveUser(userId)

      setUser(userData.user)
    }
    fetchUser()
  }, [userId])

  const handleSubmit = async (values: User) => {
    try {
      const updatedDetails = {
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        phone_country_code: values.phone_country_code,
        email: values.email,
      }

      await updateUser(userId, updatedDetails)

      setUser({ ...values })
      showToast('Perfil actualizado correctamente.', ToastType.SUCCESS)
    } catch (error) {
      console.error('Error al actualizar el perfil:', error)
      showToast('Algo sucedio, intentalo más tarde.', ToastType.ERROR)
    }
  }

  const handleUploadImage = async (imageFile: File) => {
    const response = await updateUserImage(userId, imageFile)
    if (response.status === 200) {
      showToast('Imagen de perfil actualizada', ToastType.SUCCESS)
      //Update photo in session
      uploadSessionProfilePhoto(response.data.imageUrl)
    }
  }

  return (
    <div className='profile-container max-w-lg mx-auto p-6'>
      <ProfileImage
        image={user.image}
        profilePhoto={profilePhoto}
        handleUploadImage={handleUploadImage}
      />

      <ProfileForm user={user} onSubmit={handleSubmit} />
    </div>
  )
}
