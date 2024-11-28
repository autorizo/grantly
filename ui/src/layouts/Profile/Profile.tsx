import { useState, useEffect } from 'react'
import axios from 'axios'
import { Drawer, UpdateName, UpdateImage, ChangePassword } from 'components'
import { useAuth } from 'contexts'
import { retrieveUser } from 'servers'

interface User {
  name: string
  image: string
  email: string
}

export const Profile = () => {
  const { session } = useAuth()
  const [user, setUser] = useState<User>({ name: '', image: '', email: '' })
  const [isNameDrawerOpen, setIsNameDrawerOpen] = useState(false)
  const [isImageDrawerOpen, setIsImageDrawerOpen] = useState(false)
  const [isPasswordDrawerOpen, setIsPasswordDrawerOpen] = useState(false)
  const userId = session?.user?.id ?? ''

  useEffect(() => {
    const fetchUser = async () => {
      const user = (await retrieveUser(userId)) as User
      setUser(user)
    }
    fetchUser()
  }, [userId])

  const validateOldPassword = async (oldPassword: string) => {
    try {
      await axios.post('/api/user/password/validate', { oldPassword })
      return true
    } catch (error) {
      console.error('Error validating old password:', error)
      return false
    }
  }

  const handleUpdateName = async (newName: string) => {
    try {
      const response = await axios.put<User>('/api/user/name', {
        name: newName,
      })
      setUser(prevState => ({ ...prevState, name: response.data.name }))
      setIsNameDrawerOpen(false)
    } catch (error) {
      console.error('Error updating name:', error)
    }
  }

  const handleUpdateImage = async (imageFile: File) => {
    try {
      const formData = new FormData()
      formData.append('image', imageFile)
      const response = await axios.put<User>('/api/user/image', formData)
      setUser(prevState => ({ ...prevState, image: response.data.image }))
      setIsImageDrawerOpen(false)
    } catch (error) {
      console.error('Error updating image:', error)
    }
  }

  const handleChangePassword = async (
    oldPassword: string,
    newPassword: string
  ) => {
    try {
      await axios.put('/api/user/password', { oldPassword, newPassword })
      setIsPasswordDrawerOpen(false)
    } catch (error) {
      console.error('Error changing password:', error)
    }
  }

  return (
    <div className='profile-container max-w-lg mx-auto p-6'>
      <h1 className='text-2xl font-semibold'>Profile</h1>
      <div className='mt-4'>
        <div className='flex items-center space-x-4'>
          <img
            src={user.image || '/default-avatar.png'}
            alt='Profile'
            className='w-24 h-24 rounded-full'
          />
          <button
            onClick={() => setIsImageDrawerOpen(true)}
            className='bg-blue-500 text-white px-4 py-2 rounded-lg'
          >
            Change Image
          </button>
        </div>
        <div className='mt-4'>
          <div className='flex justify-between'>
            <span className='text-lg font-medium'>Name: </span>
            <span>{user.name}</span>
          </div>
          <button
            onClick={() => setIsNameDrawerOpen(true)}
            className='mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg'
          >
            Edit Name
          </button>
        </div>
        <div className='mt-4'>
          <div className='flex justify-between'>
            <span className='text-lg font-medium'>Email: </span>
            <span>{user.email}</span>
          </div>
        </div>
        <button
          onClick={() => setIsPasswordDrawerOpen(true)}
          className='mt-4 bg-red-500 text-white px-4 py-2 rounded-lg'
        >
          Change Password
        </button>
      </div>

      {/* Drawer for updating name */}
      <Drawer
        isOpen={isNameDrawerOpen}
        onClose={() => setIsNameDrawerOpen(false)}
      >
        <UpdateName
          currentName={user.name}
          onUpdate={handleUpdateName}
          onClose={() => setIsNameDrawerOpen(false)}
        />
      </Drawer>

      {/* Drawer for updating image */}
      <Drawer
        isOpen={isImageDrawerOpen}
        onClose={() => setIsImageDrawerOpen(false)}
      >
        <UpdateImage
          onUpdate={handleUpdateImage}
          onClose={() => setIsImageDrawerOpen(false)}
        />
      </Drawer>

      {/* Drawer for changing password */}
      <Drawer
        isOpen={isPasswordDrawerOpen}
        onClose={() => setIsPasswordDrawerOpen(false)}
      >
        <ChangePassword
          onOldPasswordValidation={validateOldPassword}
          onChangePassword={handleChangePassword}
          onClose={() => setIsPasswordDrawerOpen(false)}
        />
      </Drawer>
    </div>
  )
}
