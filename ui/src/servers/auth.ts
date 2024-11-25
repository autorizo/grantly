import server from './server'

export const loginUser = async (email: string, password: string) => {
  const { data } = await server.post(`/login`, {
    email,
    password,
  })
  return data
}

export const generateRecoveryToken = async (email: string) => {
  const { data } = await server.post(`/generate-token`, {
    email,
  })
  return data
}
