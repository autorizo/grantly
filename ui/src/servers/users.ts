import server from './server'

export const fetchProviders = async (userId: string) => {
  const { data } = await server.get(`/users/${userId}/permissions`)
  return data
}

export const togglePermissionAPI = async (
  userId: string,
  permissionId: string,
  state: string,
  isAnActiveProvider: boolean,
  justification?: string
) => {
  try {
    const response = await server.post(`/permission`, {
      userId,
      permissionId,
      state,
      justification,
    })

    return { ...response.data, isAnActiveProvider } // Return the updated permission
  } catch (error) {
    console.error('Error toggling permission:', error)
    throw error // Throw error to handle it in the frontend
  }
}

export const retrieveUser = async (userId: string) => {
  const { data } = await server.get(`/users/${userId}`)
  return data
}

export const updateUser = async (userId: string, updatedDetails: any) => {
  try {
    await server.put(`/users/${userId}`, updatedDetails)
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

export const createUser = async (newUser: any) => {
  try {
    const { data } = await server.post(`/users`, newUser)
    return data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const updateUserImage = async (userId: string, image: File) => {
  try {
    const formData = new FormData()
    formData.append('image', image)
    return await server.put(`/users/${userId}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.error('Error updating user image:', error)
    throw error
  }
}
