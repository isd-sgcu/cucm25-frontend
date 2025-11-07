import { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowBack } from '@mui/icons-material'
import type { UserInterface } from '@/interface/user'
import { mockJuniorUser } from '@/utils/const'
import { formatEducationLevel, formatRole } from '@/utils/function'

interface ResetUserPopupProps {
  setOpenReceivingCoinPopup: (bool: boolean) => void
}

function ResetUserPopup({ setOpenReceivingCoinPopup }: ResetUserPopupProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [userId, setUserId] = useState<string>('')
  const [isUserExisted, setIsUserExisted] = useState(false)
  const [targetUser, setTargetUser] = useState<UserInterface | null>(null)

  const handleClosePopup = () => {
    setUserId('')
    setStep(1)
    setOpenReceivingCoinPopup(false)
  }

  function handleSubmitStep1(e: React.FormEvent) {
    e.preventDefault()
    setStep(2)

    // Just mocking
    const randomNum = Math.random()
    if (randomNum < 0.5) {
      setIsUserExisted(false)
    } else {
      setTargetUser(mockJuniorUser)
      setIsUserExisted(true)
    }
  }

  return (
    <>
      {/* Overlay */}
      <div className='fixed inset-0 bg-black/70 backdrop-blur-sm z-40'></div>

      {/* Modal Step 1 */}
      {step == 1 && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <form
            className='max-w-md w-[80%] flex flex-col gap-8 items-center bg-white rounded-2xl p-6'
            onSubmit={handleSubmitStep1}
          >
            {/* Header */}
            <p className='title-large text-center'>Reset User</p>

            {/* Form */}
            <div className='w-full flex flex-col'>
              <Input
                value={userId}
                placeholder='ใส่ User ID เพื่อค้นหา'
                onChange={e => {
                  setUserId(e.target.value);
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
                disabled={userId.trim() === ''}
              >
                ต่อไป
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Step 2 */}
      {step == 2 && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <form
            className='max-w-md w-[80%] flex flex-col gap-3 items-center bg-white rounded-2xl p-6'
            onSubmit={handleClosePopup}
          >
            {/* Header */}
            <p className='title-large text-center'>Reset User</p>

            {
              isUserExisted && targetUser ? (
                <>
                  {/* User Data */}
                  <div className='w-full flex flex-col gap-1'>
                    <div className='rounded-2xl px-4 bg-purple text-white w-fit mx-auto title-medium-emphasized py-1.5'>ID : {targetUser.studentId}</div>
                    <div className="flex flex-col text-center">
                      <p className='title-large-emphasized'>{targetUser.firstname + " " + targetUser.lastname}</p>
                      <p className='title-medium'>{targetUser.school + " " + formatEducationLevel({
                        educationLevel: targetUser.education_level,
                        year: targetUser.year
                      })}</p>
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
                      type='submit'
                    >
                      ยืนยัน
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* User Data */}
                  <div className='w-full flex flex-col gap-1'>
                    <p className='text-center headline-large-emphasized text-red'>ไม่มี User ID นี้</p>
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
              )
            }
          </form >
        </div >
      )}
    </>
  )
}

export default ResetUserPopup
