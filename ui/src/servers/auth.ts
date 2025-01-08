import server from './server'

export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await server.post(`/login`, {
      email,
      password,
    })
    return data
  } catch (error: any) {
    return error.response.data
  }
}

export const generateRecoveryToken = async (email: string) => {
  return await server.post(`/generate-token`, {
    email,
  })
}

export const resetPassword = async (payload: {
  password: string
  token: string
}) => {
  return await server.post(`/reset-password`, {
    ...payload,
  })
}
