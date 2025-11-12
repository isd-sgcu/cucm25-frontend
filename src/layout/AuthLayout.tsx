import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@/context/User'
import { useEffect, useState } from 'react'
import { getMe } from '@/api/auth'
import type { UserRoleType } from '@/utils/const'

interface AuthLayoutProps {
  allowedRoles?: Array<UserRoleType>
}

export default function AuthLayout({ allowedRoles }: AuthLayoutProps) {
  const { setUser } = useUser()
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      setIsAuthorized(false)
      setLoading(false)
      return
    }

    ;(async () => {
      try {
        const { user: fetchedUser } = await getMe()
        if (fetchedUser) {
          setUser(fetchedUser)
          if (!allowedRoles || allowedRoles.includes(fetchedUser.role)) {
            setIsAuthorized(true)
          } else {
            setIsAuthorized(false)
          }
        } else {
          setIsAuthorized(false)
        }
      } catch (error) {
        console.error('AuthLayout error:', error)
        setIsAuthorized(false)
      } finally {
        setLoading(false)
      }
    })()
  }, [setUser, allowedRoles])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-lg text-gray-500'>Loading...</p>
      </div>
    )
  }

  if (!isAuthorized) {
    return <Navigate to='/auth/login' replace />
  }

  return <Outlet />
}
