import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconBox } from '../ui/icon-box'
import { Icon } from '@iconify/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowBack } from '@mui/icons-material'
import { useUser } from '@/context/User'
import type { UserRoleType } from '@/utils/const'

interface SendingGiftPopupProps {
  setOpenSendingGiftPopup: (bool: boolean) => void
}

function SendingGiftPopup({ setOpenSendingGiftPopup }: SendingGiftPopupProps) {
  const { user } = useUser()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const [sendingGiftForm, setSendingGiftForm] = useState<{
    role: UserRoleType
    id: number
  }>({
    role: user?.role ?? 'junior',
    id: 0,
  })

  if (!user) return null

  function handleSubmitSendingGift(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage('')

    if (sendingGiftForm.id === 0) {
      setErrorMessage('กรุณากรอก ID ของผู้รับ')
      return
    }

    const userId = user.username.slice(1)
    if (sendingGiftForm.role === user.role && sendingGiftForm.id === Number(userId)) {
      setErrorMessage('ไม่สามารถส่งของขวัญให้ตัวเองได้')
      return
    }

    navigate(`/questions?role=${sendingGiftForm.role}&id=${sendingGiftForm.id}`)
    setOpenSendingGiftPopup(false)
    setSendingGiftForm({
      role: user.role,
      id: 0,
    })
  }

  return (
    <>
      {/* Overlay */}
      <div className='fixed inset-0 bg-black/70 backdrop-blur-sm z-40'></div>

      {/* Modal */}
      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <form
          className='max-w-md w-[80%] flex flex-col gap-8 items-center bg-white rounded-2xl p-6'
          onSubmit={handleSubmitSendingGift}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
            }
          }}
        >
          {/* Header */}
          <div className='w-full flex flex-col items-center gap-2'>
            <IconBox bgcolor='light-blue' className='w-18 h-18'>
              <Icon icon='solar:gift-linear' color='black' className='w-12 h-12' />
            </IconBox>
            <p className='title-large text-center'>
              <span className='font-semibold'>ส่งของขวัญ</span>
            </p>
          </div>

          {/* Form */}
          <div className='w-full flex flex-col'>
            <p className='label-large font-semibold'>กรอก ID ของผู้รับ</p>
            <div className='flex gap-2 items-center w-full'>
              <DropdownMenu size='sm' color='light-blue'>
                <DropdownMenuTrigger className='w-fit bg-light-blue'>
                  {sendingGiftForm.role === 'junior' ? 'N' : 'P'}
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    {['P', 'N'].map(role => (
                      <DropdownMenuItem
                        key={role}
                        onClick={() => {
                          setErrorMessage('')
                          setSendingGiftForm(prev => ({
                            ...prev,
                            role: role === 'P' ? 'senior' : 'junior',
                          }))
                        }}
                      >
                        {role}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Input
                value={Number(sendingGiftForm.id) ?? ''}
                onChange={e => {
                  setErrorMessage('')
                  const value = e.target.value
                  if (/^\d*$/.test(value)) {
                    setSendingGiftForm(prev => ({
                      ...prev,
                      id: Number(value),
                    }))
                  }
                }}
              />
            </div>
          </div>

          {/* Error message */}
          {errorMessage && <p className='text-red title-small'>{errorMessage}</p>}

          {/* Buttons */}
          <div className='w-full flex justify-center items-center gap-2 flex-wrap'>
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                setErrorMessage('')
                setOpenSendingGiftPopup(false)
                setSendingGiftForm({
                  role: user.role,
                  id: 0,
                })
              }}
            >
              <ArrowBack fontSize='small' />
              <p>ย้อนกลับ</p>
            </Button>

            <Button size='sm' type='submit' disabled={sendingGiftForm.id === 0}>
              ต่อไป
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SendingGiftPopup
