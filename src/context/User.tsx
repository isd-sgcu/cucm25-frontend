import type { UserInterface } from '@/interface/user'
import { createContext, useContext, useState } from 'react'

type UserContextType = {
  user: UserInterface | null
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

/**
 * Provides user state and an updater to descendant components via context.
 *
 * @param children - React nodes that will consume the user context
 * @returns A context provider element that supplies `{ user, setUser }` to its descendants
 */
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInterface | null>(null)

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}