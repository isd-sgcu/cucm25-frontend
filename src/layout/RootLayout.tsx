import { Outlet } from 'react-router-dom'
import { SystemStatusProvider } from '@/context/SystemStatus'
import { UserProvider } from '@/context/User'

export default function RootLayout() {
  return (
    <SystemStatusProvider>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </SystemStatusProvider>
  )
}
