import { jwtDecode as decodeJwt } from 'jwt-decode'

export const jwtDecode = (token: string) => {
  try {
    return decodeJwt(token)
  } catch (error) {
    console.error('Invalid token', error)
    return null
  }
}
