import type { UserInterface } from '@/interface/user'
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type UserContextType = {
  user: UserInterface | null
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
  logout: () => boolean
  isLoggingOut: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

/**
 * Provides user state and an updater to descendant components via context.
 *
 * @param children - React nodes rendered inside the provider
 * @returns The context provider element that supplies the current `user` and `setUser` updater to descendants
 */
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInterface | null>(null)
  const [isLoggingOut, setLoggingOut] = useState(false)
  const navigate = useNavigate()

  function logout() {
    setLoggingOut(true)
    try {
      localStorage.removeItem('token')
      navigate('/auth/login')
      setLoggingOut(false)
      return true
    } catch (error) {
      setLoggingOut(false)
      return false
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout, isLoggingOut }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
