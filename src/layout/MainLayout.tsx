import SystemClosedPopup from '@/components/popup/SystemClosedPopup'
import { useSystemStatus } from '@/context/SystemStatus'
import { useUser } from '@/context/User'
import { useLocation } from 'react-router-dom'

function MainLayout({ children }: { children: React.ReactNode }) {
  const { juniorLoginEnabled, seniorLoginEnabled, modLoginEnabled } = useSystemStatus()
  const location = useLocation()

  const { user } = useUser()
  let isClosed = false

  if (user?.role == 'PARTICIPANT') {
    isClosed = !juniorLoginEnabled
  } else if (user?.role == 'STAFF') {
    isClosed = !seniorLoginEnabled
  } else if (user?.role == 'MODERATOR') {
    isClosed = !modLoginEnabled
  }

  const shouldShowPopup = isClosed && location.pathname !== '/auth/system-closed'

  return (
    <div className='w-full bg-black h-screen flex justify-center'>
      <div className='w-full sm:max-w-md min-h-screen overflow-auto bg-white flex flex-col gap-8'>
        {children}
      </div>

      {shouldShowPopup && <SystemClosedPopup />}
    </div>
  )
}

export default MainLayout