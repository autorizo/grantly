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
    // await a few seconds to avoid multiple requests
    await new Promise(resolve => setTimeout(resolve, 200))
    return { ...response.data, isAnActiveProvider } // Return the updated permission
  } catch (error) {
    console.error('Error toggling permission:', error)
    throw error // Throw error to handle it in the frontend
  }
}
