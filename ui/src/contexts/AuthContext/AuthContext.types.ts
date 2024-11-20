import { ReactNode } from 'react'

export type User = {
  id: string
  email: string
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
}

export type AuthProviderProps = {
  children: ReactNode
}
