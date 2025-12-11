import { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowBack } from '@mui/icons-material'
import type { UserInterface } from '@/interface/user'
import { formatEducation, formatRole } from '@/utils/function'
import { getUser, reset } from '@/api/user'
import { useUser } from '@/context/User'

interface ResetUserPopupProps {
  setOpenReceivingCoinPopup: (bool: boolean) => void
}

function ResetUserPopup({ setOpenReceivingCoinPopup }: ResetUserPopupProps) {
  const { user } = useUser()
  const [step, setStep] = useState<1 | 2>(1)
  const [username, setUsername] = useState<string>('')
  const [isUserExisted, setIsUserExisted] = useState(false)
  const [targetUser, setTargetUser] = useState<UserInterface | null>(null)

  if (!user) return null

  const handleClosePopup = () => {
    setUsername('')
    setStep(1)
    setOpenReceivingCoinPopup(false)
  }

  const handleSubmitStep1 = async (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim() === '') return

    try {
      const u = await getUser(username.trim())
      if (u) {
        setTargetUser(u.user)
        setIsUserExisted(true)
      } else {
        setIsUserExisted(false)
        setTargetUser(null)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      setIsUserExisted(false)
    }
    setStep(2)
  }

  const handleResetUser = async () => {
    if (!targetUser) return
    try {
      await reset(targetUser.username)
    } catch (error) {
      console.error('Error resetting user:', error)
    } finally {
      handleClosePopup()
    }
  }

  return (
    <>
      {/* Overlay */}
      <div className='fixed inset-0 bg-black/70 backdrop-blur-sm z-40'></div>

      {/* Modal Step 1 */}
      {step === 1 && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <form
            className='max-w-md w-[80%] flex flex-col gap-4 items-center bg-white rounded-2xl p-6 shadow-make-cartoonish'
            onSubmit={handleSubmitStep1}
          >
            {/* Header */}
            <p className='title-large text-center'>Reset User</p>

            {/* Form */}
            <div className='w-full flex flex-col'>
              <Input
                value={username}
                placeholder='ใส่ Username เพื่อค้นหา'
                onChange={e => {
                  setUsername(e.target.value)
                }}
              />
            </div>

            {/* Buttons */}
            <div className='w-full flex justify-center items-center gap-2 flex-wrap'>
              <Button
                size='custom'
                className='rounded-full px-3 py-1.5 flex gap-1 w-fit min-w-24 justify-center items-center'
                variant='outline'
                onClick={() => handleClosePopup()}
              >
                <ArrowBack fontSize='small' />
                <p>ย้อนกลับ</p>
              </Button>
              <Button
                size='custom'
                className='rounded-full px-3 py-1.5 flex gap-1 w-fit min-w-24'
                type='submit'
                disabled={username.trim() === ''}
              >
                ต่อไป
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Step 2 */}
      {step === 2 && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <form
            className='max-w-md w-[80%] flex flex-col gap-4 items-center bg-white rounded-2xl p-6 shadow-make-cartoonish'
          >
            {/* Header */}
            <p className='title-large text-center'>Reset User</p>

            {isUserExisted && targetUser ? (
              <>
                {/* User Data */}
                <div className='w-full flex flex-col gap-1.5'>
                  <div className='rounded-2xl px-4 bg-purple text-white w-fit mx-auto title-medium-emphasized py-1.5 text-center'>
                    {targetUser.username}
                  </div>
                  <div className='flex flex-col text-center'>
                    <p className='title-large-emphasized'>
                      {targetUser.nickname + ' ' + targetUser.firstname + ' ' + targetUser.lastname}
                    </p>
                    <p className='title-medium'>
                      {targetUser.school + ' ' + formatEducation(targetUser.educationLevel)}
                    </p>
                    <p className='title-medium'>{formatRole(targetUser.role)}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className='w-full flex justify-center items-center gap-2 flex-wrap'>
                  <Button
                    size='custom'
                    className='rounded-full px-3 py-1.5 flex gap-1 w-fit min-w-24 justify-center items-center'
                    variant='outline'
                    onClick={() => setStep(1)}
                  >
                    <ArrowBack fontSize='small' />
                    <p>ย้อนกลับ</p>
                  </Button>
                  <Button
                    size='custom'
                    className='rounded-full px-3 py-1.5 flex gap-1 w-fit min-w-24'
                    type='button'
                    onClick={handleResetUser}
                  >
                    ยืนยัน
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* User Data */}
                <div className='w-full flex flex-col gap-1'>
                  <p className='text-center headline-large-emphasized text-red'>
                    ไม่มี User ID นี้
                  </p>
                </div>

                {/* Buttons */}
                <div className='w-full flex justify-center items-center gap-2 flex-wrap'>
                  <Button
                    size='custom'
                    className='rounded-full px-3 py-1.5 flex gap-1 w-fit min-w-24 justify-center items-center'
                    variant='outline'
                    onClick={() => setStep(1)}
                  >
                    <ArrowBack fontSize='small' />
                    <p>ย้อนกลับ</p>
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      )}
    </>
  )
}

export default ResetUserPopup
