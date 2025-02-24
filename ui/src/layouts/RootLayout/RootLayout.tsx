import { Outlet } from 'react-router-dom'
import { Banner } from 'components'
import { useAuth } from 'contexts'
import { Navigate } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'

export const RootLayout = () => {
  const { session, loading } = useAuth() ?? {}

  if (loading) {
    return <div>Loading...</div>
  }

  if (!session) {
    return <Navigate to='/login' replace />
  }

  const { accessToken } = session ?? {}
  const socket: Socket = io('http://localhost:3001', {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  socket.on('connect', () => {
    console.log('✅ Conectado al WebSocket')
  })

  socket.on('connect_error', error => {
    console.log(error)
  })

  socket.on('receive-notification', test => {
    console.log('Here it goes', test)
  })

  const { user } = session
  const { userName } = user ?? {}

  return (
    <div className='bg-gray-100 h-screen overflow-auto pb-2'>
      <Banner userName={userName} />

      {/* Outlet for rendering child routes */}
      <div className='px-2 pb-20'>
        <Outlet />
      </div>
    </div>
  )
}
