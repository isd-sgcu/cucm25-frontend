import { Icon } from '@iconify/react'
import { Button } from '../ui/button'
import { useUser } from '@/context/User'
import { useState } from 'react'
import { ArrowBack } from '@mui/icons-material'

interface LogoutPopupProps {
  setOpenLogoutPopup: (bool: boolean) => void
}

function LogoutPopup({ setOpenLogoutPopup }: LogoutPopupProps) {
  const { isLoggingOut, logout } = useUser()
  const [isLogoutError, setLogoutError] = useState(false)

  return (
    <>
      {/* Overlay */}
      <div className='fixed inset-0 bg-black/70 backdrop-blur-sm z-40'></div>

      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <div className='max-w-md w-[80%] flex flex-col gap-8 items-center bg-white rounded-2xl'>
          {/* Header */}
          <div className='w-full flex flex-col items-center p-6 gap-2 rounded-t-2xl bg-red'>
            <Icon icon='solar:star-rings-linear' color='white' className='w-14 h-14' />
            <p className='title-large text-white text-center'>ออกจากระบบ</p>
          </div>

          {/* Content */}
          <div className='w-full flex flex-col items-center px-6'>
            <p className='title-large mb-2 text-center'>
              <span className='font-semibold'>คุณกำลังต้องการออกจากระบบหรือไม่?</span>
            </p>
            <p className='title-small text-center'>{`ไปแล้วก็กลับมาใหม่ได้นะ ^_^`}</p>
            {isLogoutError && <p className='text-red'>การออกจากระบบมีปัญหา กรุณาลองใหม่อีกครั้ง</p>}
          </div>

          {/* Buttons */}
          <div className='w-full flex justify-center items-center gap-2 pb-6 px-6'>
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                setLogoutError(false)
                setOpenLogoutPopup(false)
              }}
            >
              <ArrowBack fontSize='small' />
              <p>ย้อนกลับ</p>
            </Button>
            <Button
              size='sm'
              disabled={isLoggingOut}
              onClick={() => {
                setLogoutError(false)
                const success = logout()
                if (success) {
                  setOpenLogoutPopup(false)
                } else {
                  setLogoutError(true)
                }
              }}
            >
              ตกลง
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogoutPopup
