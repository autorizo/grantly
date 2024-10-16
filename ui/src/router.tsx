// router.tsx (or router.js)
import { RootLayout, ProvidersList, Notifications } from 'layouts'
import { createBrowserRouter, Navigate } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'active',
        element: <ProvidersList isActive={true} />, // Pass prop for active
      },
      {
        path: 'inactive',
        element: <ProvidersList isActive={false} />, // Pass prop for inactive
      },
      {
        path: 'notifications',
        element: <Notifications />, // Your existing Notifications component
      },
      {
        path: '/',
        element: <Navigate to="/active" replace />, // Redirect to active providers
      },
      {
        path: '*',
        element: <ProvidersList isActive={true} />, // Redirect to Active by default
      },
    ],
    
  },
])
