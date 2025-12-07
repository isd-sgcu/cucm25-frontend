import { createContext, useContext, useState, useEffect } from 'react'
import { getStatus } from '@/api/system'
import { useLocation } from 'react-router-dom'

type SystemStatusContextType = {
  juniorLoginEnabled: boolean
  modLoginEnabled: boolean
  seniorLoginEnabled: boolean
  giftHourlyQuota: number
}

const SystemStatusContext = createContext<SystemStatusContextType | undefined>(undefined)

export function SystemStatusProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<SystemStatusContextType>({
    juniorLoginEnabled: true,
    modLoginEnabled: true,
    seniorLoginEnabled: false,
    giftHourlyQuota: 6,
  })

  const location = useLocation()

  async function fetchStatus() {
    try {
      const { juniorLoginEnabled, modLoginEnabled, seniorLoginEnabled, giftHourlyQuota } =
        await getStatus()
      setStatus({
        juniorLoginEnabled,
        modLoginEnabled,
        seniorLoginEnabled,
        giftHourlyQuota,
      })
    } catch (err) {
      console.error('Failed to fetch system status:', err)
    }
  }

  // Fetch ทุกครั้งที่เปลี่ยนหน้า
  useEffect(() => {
    fetchStatus()
  }, [location.pathname])

  // Fetch ทุก 60 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStatus()
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  return <SystemStatusContext.Provider value={status}>{children}</SystemStatusContext.Provider>
}

export function useSystemStatus() {
  const context = useContext(SystemStatusContext)
  if (!context) {
    throw new Error('useSystemStatus must be used within a SystemStatusProvider')
  }
  return context
}
