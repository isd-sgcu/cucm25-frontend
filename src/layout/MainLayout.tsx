import SystemClosedPopup from '@/components/popup/SystemClosedPopup'
import { useSystemStatus } from '@/context/SystemStatus'
import { useUser } from '@/context/User'
import { useLocation } from 'react-router-dom'

const notShowClosedSystemPopupPaths = ['/auth/system-closed', '/auth/login']

function MainLayout({ children }: { children: React.ReactNode }) {
  const { juniorLoginEnabled, seniorLoginEnabled, modLoginEnabled } = useSystemStatus()

  const { user } = useUser()
  let isEnabled = false

  const location = useLocation()

  if (user?.role == 'PARTICIPANT') {
    isEnabled = juniorLoginEnabled
  } else if (user?.role == 'STAFF') {
    isEnabled = seniorLoginEnabled
  } else if (user?.role == 'MODERATOR') {
    isEnabled = modLoginEnabled
  } else {
    isEnabled = true
  }

  const shouldShowPopup = !notShowClosedSystemPopupPaths.includes(location.pathname) && !isEnabled

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
