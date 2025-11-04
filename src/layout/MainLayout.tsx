import SystemClosedPopup from '@/components/popup/SystemClosedPopup'
import { useSystemStatus } from '@/context/SystemStatus'

function MainLayout({ children }: { children: React.ReactNode }) {
  const { isClosed } = useSystemStatus()

  return (
    <div className='w-full bg-black h-screen flex justify-center'>
      <div className='w-full sm:max-w-md min-h-screen overflow-auto bg-white flex flex-col gap-8'>
        {children}
      </div>

      {isClosed && <SystemClosedPopup />}
    </div>
  )
}

export default MainLayout
