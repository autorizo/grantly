import axios from 'axios'

const API_URL = process.env.REACT_APP_BE_URL

export const fetchProviders = async (userId: string) => {
  const { data } = await axios.get(`${API_URL}/users/${userId}/permissions`)
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
    const response = await axios.post(`${API_URL}/permission`, {
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
