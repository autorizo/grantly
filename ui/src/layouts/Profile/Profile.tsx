import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
    image: '',
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
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
      const formData = new FormData()
      if (imageFile) {
        formData.append('image', imageFile)
      }

      const updatedDetails = {
        username: values.username,
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        phone_country_code: values.phone_country_code,
        email: values.email,
      }

      await updateUser(userId, updatedDetails)

      if (imageFile) {
        await updateUserImage(userId, imageFile)
      }

      setUser({ ...values, image: user.image })
      alert('Perfil actualizado exitosamente')
    } catch (error) {
      console.error('Error al actualizar el perfil:', error)
      alert('No se pudo actualizar el perfil.')
    }
  }

  return (
    <div className='profile-container max-w-lg mx-auto p-6'>
      <ProfileImage
        image={user.image || '/default-avatar.png'} // Asegúrate de que el valor de image no sea undefined
        profilePhoto={profilePhoto}
      />

      <ProfileForm user={user} onSubmit={handleSubmit} />
    </div>
  )
}
