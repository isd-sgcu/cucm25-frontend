// import { useEffect } from 'react'
import SystemClosedPopup from '@/components/popup/SystemClosedPopup'
import { useSystemStatus } from '@/context/SystemStatus'
// import { getHealth } from '@/api/test'

function MainLayout({ children }: { children: React.ReactNode }) {
  const { isClosed } = useSystemStatus()

  // Check Connection

  // useEffect(() => {
  //   const fetchHealth = async () => {
  //     try {
  //       const health = await getHealth()
  //       console.log('Backend health:', health)
  //     } catch (err) {
  //       console.error('Failed to fetch health:', err)
  //     }
  //   }

  //   fetchHealth()
  // }, [])

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
