import React, { createContext, useState, useEffect } from 'react'
import {
  AuthContextType,
  AuthProviderProps,
  OauthProvider,
  Session,
  User,
} from './AuthContext.types'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null)

  // Set up message listener to close popup and update session when authentication is done
  const handleMessage = (event: MessageEvent) => {
    if (event.origin !== 'http://localhost:3001') return // Check the message origin

    if (event.data === 'authComplete') {
      initializeSession()
    }
  }

  // Function to decode the token and set session from localStorage or URL
  const initializeSession = (token?: string) => {
    const savedSession = localStorage.getItem('session')
    if (savedSession) {
      const parsedSession: Session = JSON.parse(savedSession)
      setSession(parsedSession)
    } else {
      const queryParams = new URLSearchParams(window.location.search)
      const paramsToken = queryParams.get('jwt')

      if (paramsToken || token) {
        const validToken = (paramsToken || token) as string
        const userData = jwtDecode(validToken) as User
        const newSession = { user: userData, accessToken: validToken }
        setSession(newSession)
        localStorage.setItem('session', JSON.stringify(newSession)) // Save session to localStorage
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        ) // Clean up URL
        window.opener?.postMessage('authComplete', 'http://localhost:3000') // Notify parent window
        window.close() // Close popup
        window.removeEventListener('message', handleMessage) // Clean up listener on component unmount
      }
    }
  }

  // Run effect on initial mount
  useEffect(() => {
    initializeSession()
  }, [])

  // Handle sign-in by opening the popup for the given provider
  const signIn = async (provider: OauthProvider) => {
    const authUrls = {
      google: 'http://localhost:3001/auth/google',
      facebook: 'http://localhost:3001/auth/facebook',
      microsoft: 'http://localhost:3001/auth/microsoft',
    }

    const popup = window.open(
      authUrls[provider],
      `${provider.charAt(0).toUpperCase() + provider.slice(1)} Sign-In`,
      'width=600,height=600,left=200,top=200'
    )

    window.addEventListener('message', handleMessage)

    if (popup) {
      popup.focus()

      // Poll to see if the popup was closed
      const interval = setInterval(() => {
        if (popup.closed) {
          clearInterval(interval)
          initializeSession()
        }
      }, 1000)
    }
  }

  // Handle sign-out and remove session
  const signOut = async () => {
    await fetch('http://localhost:3001/api/auth/signout', {
      method: 'POST',
    })
    setSession(null)
    localStorage.removeItem('session')
  }

  return (
    <AuthContext.Provider
      value={{ session, signIn, signOut, initializeSession }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)
