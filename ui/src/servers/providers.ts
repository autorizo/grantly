import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
const userId = process.env.REACT_APP_USER_ID

export const toggleProviderAPI = async (
  providerId: string,
  justification: string
) => {
  try {
    const response = await axios.post(`${API_URL}/provider/${providerId}`, {
      justification,
      userId,
    })
    // await a few seconds to avoid multiple requests
    await new Promise(resolve => setTimeout(resolve, 200))
    return { ...response.data, providerId } // Return the updated permission
  } catch (error) {
    console.error('Error toggling permission:', error)
    throw error // Throw error to handle it in the frontend
  }
}
