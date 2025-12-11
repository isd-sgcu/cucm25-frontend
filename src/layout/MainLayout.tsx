import SystemClosedPopup from '@/components/popup/SystemClosedPopup'
import { useSystemStatus } from '@/context/SystemStatus'
import { useUser } from '@/context/User'
import { useLocation } from 'react-router-dom'

const notShowClosedSystemPopupPaths = ['/auth/system-closed', '/auth/login']

/**
 * Main application layout that centers content and conditionally displays a system-closed popup.
 *
 * Renders a centered container with `children`. If the current route is not in the excluded paths
 * and the system login is disabled for the current user's role, renders `SystemClosedPopup`.
 * Unknown or unrecognized user roles are treated as enabled (the popup will not be shown).
 *
 * @param children - Content to render inside the layout
 * @returns The layout element containing `children` and, when applicable, the `SystemClosedPopup`
 */
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