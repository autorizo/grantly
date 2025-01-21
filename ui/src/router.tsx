import { createBrowserRouter, Navigate } from 'react-router-dom'

import {
  RootLayout,
  ProvidersList,
  Notifications,
  ProviderType,
  LoginLayout,
  RecoverPassword,
  ResetPassword,
  Profile,
  SignUp,
} from 'layouts'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'active',
        element: (
          <ProvidersList
            key={ProviderType.ACTIVE}
            providerType={ProviderType.ACTIVE}
          />
        ), // Pass prop for active
      },
      {
        path: 'inactive',
        element: (
          <ProvidersList
            key={ProviderType.INACTIVE}
            providerType={ProviderType.INACTIVE}
          />
        ), // Pass prop for inactive
      },
      {
        path: 'blocked',
        element: (
          <ProvidersList
            key={ProviderType.BLOCKED}
            providerType={ProviderType.BLOCKED}
          />
        ), // Pass prop for inactive
      },
      {
        path: 'notifications',
        element: <Notifications />, // Your existing Notifications component
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/',
        element: <Navigate to='/active' replace />, // Redirect to active providers
      },
      {
        path: '*',
        element: <ProvidersList providerType={ProviderType.ACTIVE} />, // Pass prop for active
      },
    ],
  },
  {
    path: '/login',
    element: <LoginLayout />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/recover-password',
    element: <RecoverPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
])
