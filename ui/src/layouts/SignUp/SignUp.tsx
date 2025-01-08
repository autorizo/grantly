import { useState } from 'react'
import { createUser } from 'servers'
import { ProfileForm, ProfileImage, ToastType, User } from 'components'
import { useToast } from 'contexts'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts'

export const SignUp = () => {
  const { showToast } = useToast()
  const { initializeSession, uploadSessionProfilePhoto } = useAuth()
  const [user, setUser] = useState<User>({
    id: '',
    first_name: '',
    last_name: '',
    phone: '',
    phone_country_code: '',
    email: '',
    image: '', // Add a field for the image URL
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  const navigate = useNavigate() // Initialize the navigate function

  const handleSubmit = async (values: User) => {
    try {
      const newUser = new FormData()
      newUser.append('first_name', values.first_name)
      newUser.append('last_name', values.last_name)
      newUser.append('phone', values.phone)
      newUser.append('phone_country_code', values.phone_country_code ?? '57')
      newUser.append('email', values.email)

      if (imageFile) {
        newUser.append('image', imageFile) // Append the image file
      }

      const { jwt, imageUrl } = await createUser(newUser)

      initializeSession(jwt)
      uploadSessionProfilePhoto(imageUrl)
      navigate('/active') // Redirect to active providers

      showToast('Usuario creado correctamente.', ToastType.SUCCESS)
    } catch (error) {
      console.error('Error al crear el usuario:', error)
      showToast('Algo sucedió, intentalo más tarde.', ToastType.ERROR)
    }
  }

  const handleUploadImage = (imageFile: File) => {
    if (imageFile) {
      setImageFile(imageFile)
    }
  }

  return (
    <div className='profile-container max-w-lg mx-auto p-6'>
      <ProfileImage
        image={user.image}
        handleUploadImage={handleUploadImage}
        autoChange={true}
      />

      <ProfileForm user={user} onSubmit={handleSubmit} emailDisabled={false} />
    </div>
  )
}
