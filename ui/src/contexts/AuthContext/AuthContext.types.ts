import { ReactNode } from 'react'

export type User = {
  id: string
  email: string
  userName: string
  photo: string
}

export enum OauthProvider {
  Google = 'google',
  Facebook = 'facebook',
  Microsoft = 'microsoft',
}


export type Session = {
  user: User | null
  accessToken: string
}

export type AuthContextType = {
  session: Session | null
  signIn: (provider: OauthProvider) => void
  signOut: () => void
  initializeSession: (token?: string) => void
  loading: boolean
  profilePhoto?: string
}

export type AuthProviderProps = {
  children: ReactNode
}
