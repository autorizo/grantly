import server from './server'

export const loginUser = async (email: string, password: string) => {
  const { data } = await server.post(`/login`, {
    email,
    password,
  })
  return data
}
