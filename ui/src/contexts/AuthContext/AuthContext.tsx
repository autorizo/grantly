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
  const [loading, setLoading] = useState(true) // Add loading state
  const [profilePhoto, setProfilePhoto] = useState<string | undefined>(undefined)

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

      // Check if a cached profile photo exists
      const cachedPhoto = localStorage.getItem('profilePhoto')
      if (cachedPhoto) {
        validatePhotoUrl(cachedPhoto) // Validate the cached photo
      } else if (parsedSession.user && parsedSession.user.photo) {
        validatePhotoUrl(parsedSession.user.photo) // Validate the user's photo
      }
    } else {
      const queryParams = new URLSearchParams(window.location.search)
      const paramsToken = queryParams.get('jwt')

      if (paramsToken || token) {
        const validToken = (paramsToken || token) as string
        const userData = jwtDecode(validToken) as User

        const newSession = { user: userData, accessToken: validToken }
        localStorage.setItem('session', JSON.stringify(newSession))
        setSession(newSession)

        // Cache and validate profile photo if available
        if (userData.photo) {
          validatePhotoUrl(userData.photo)
        } else {
          setProfilePhoto(undefined) // Ensure no photo is set if invalid
        }

        // If there is a popup window, close it and notify the parent window to reload
        const popup = window.open('', '_self') // Get a reference to the popup window
        if (popup) {
          popup.close() // Close the popup
          window.opener?.postMessage('reload', '*') // Notify parent to reload
        }
      }
    }
    setLoading(false) // Mark loading as done
  }

  // Function to validate the image URL by making a fetch request
  const validatePhotoUrl = async (url: string) => {
    try {
      const response = await fetch(url, { method: 'HEAD' }) // Use HEAD request to check if the resource exists
      if (response.ok) {
        // If the photo is valid, set it
        setProfilePhoto(url)
        localStorage.setItem('profilePhoto', url)
      } else if (response.status === 404) {
        // If not found, reset the photo
        setProfilePhoto(undefined)
      } else if (response.status === 429) {
        // Handle too many requests, fallback to undefined or you could implement retry logic
        setProfilePhoto(undefined)
      } else {
        // Handle other errors or invalid statuses
        setProfilePhoto(undefined)
      }
    } catch (error) {
      console.error('Error validating photo URL:', error)
      setProfilePhoto(undefined) // Fallback in case of an error
    }
  }

  // Run effect on initial mount
  useEffect(() => {
    initializeSession()

    const handleReloadMessage = (event: MessageEvent) => {
      if (event.data === 'reload') {
        window.location.reload() // Trigger a reload when the message is received
      }
    }

    window.addEventListener('message', handleReloadMessage)

    return () => {
      window.removeEventListener('message', handleReloadMessage)
    }
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
    localStorage.removeItem('profilePhoto')
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        signIn,
        signOut,
        initializeSession,
        loading,
        profilePhoto, // Provide profilePhoto in the context
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)
