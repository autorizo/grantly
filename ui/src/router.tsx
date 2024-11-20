import { RootLayout, ProvidersList, Notifications, ProviderType } from 'layouts'
import { createBrowserRouter, Navigate } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'active',
        element: <ProvidersList providerType={ProviderType.ACTIVE} />, // Pass prop for active
      },
      {
        path: 'inactive',
        element: <ProvidersList providerType={ProviderType.INACTIVE} />, // Pass prop for inactive
      },
      {
        path: 'blocked',
        element: <ProvidersList providerType={ProviderType.BLOCKED} />, // Pass prop for inactive
      },
      {
        path: 'notifications',
        element: <Notifications />, // Your existing Notifications component
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
])
