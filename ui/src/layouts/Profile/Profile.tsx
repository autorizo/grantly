import { useState, useEffect } from 'react'
import { useAuth } from 'contexts'
import { retrieveUser, updateUser, updateUserImage } from 'servers'
import { ProfileForm, ProfileImage, User } from 'components'

export const Profile = () => {
  const { session, profilePhoto } = useAuth() // Obtener profilePhoto desde el contexto
  const [user, setUser] = useState<User>({
    username: '',
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
        username: values.username,
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        phone_country_code: values.phone_country_code,
        email: values.email,
      }

      await updateUser(userId, updatedDetails)

      setUser({ ...values })
      alert('Perfil actualizado exitosamente')
    } catch (error) {
      console.error('Error al actualizar el perfil:', error)
      alert('No se pudo actualizar el perfil.')
    }
  }

  const handleUploadImage = async (imageFile: File) => {
    await updateUserImage(userId, imageFile)
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
