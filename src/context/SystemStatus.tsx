import { createContext, useContext, useState } from 'react'

type SystemStatusContextType = {
  isClosed: boolean
  setIsClosed: (bool: boolean) => void
}

const SystemStatusContext = createContext<SystemStatusContextType | undefined>(undefined)

export function SystemStatusProvider({ children }: { children: React.ReactNode }) {
  //  Wait for API to open/close the system
  const [isClosed, setIsClosed] = useState(false)

  return (
    <SystemStatusContext.Provider value={{ isClosed, setIsClosed }}>
      {children}
    </SystemStatusContext.Provider>
  )
}

export function useSystemStatus() {
  const context = useContext(SystemStatusContext)
  if (!context) {
    throw new Error('useSystemStatus must be used within a SystemStatusProvider')
  }
  return context
}
