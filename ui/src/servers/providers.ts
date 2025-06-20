import server from './server'

export const toggleProviderAPI = async (
  providerId: string,
  justification: string
) => {
  try {
    const response = await server.post(`/provider/${providerId}`, {
      justification,
    })
    // await a few seconds to avoid multiple requests
    await new Promise(resolve => setTimeout(resolve, 200))
    return { ...response.data, providerId } // Return the updated permission
  } catch (error) {
    console.error('Error toggling permission:', error)
    throw error // Throw error to handle it in the frontend
  }
}
