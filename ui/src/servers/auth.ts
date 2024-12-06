import server from './server'

export const loginUser = async (email: string, password: string) => {
  const { data } = await server.post(`/login`, {
    email,
    password,
  })
  return data
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
