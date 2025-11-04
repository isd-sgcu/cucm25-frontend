import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './route.tsx'
import { RouterProvider } from 'react-router-dom'
import { SystemStatusProvider } from './context/SystemStatus.tsx'
import { UserProvider } from './context/User.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SystemStatusProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </SystemStatusProvider>
  </StrictMode>
)
