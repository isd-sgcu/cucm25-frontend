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
  const [sendingGiftForm, setSendingGiftForm] = useState<{
    role: UserRoleType
    id: string
  }>({ role: user.role, id: '' })

  function handleSubmitSendingGift(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    navigate(`/questions?role=${sendingGiftForm.role}&id=${sendingGiftForm.id}`)
    setOpenSendingGiftPopup(false)
    setSendingGiftForm({
      role: user.role,
      id: '',
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
            <p className='label-large'>
              <span className='font-semibold'>กรอก ID ของผู้รับ</span>
            </p>
            <div className='flex gap-2 items-center w-full'>
              <DropdownMenu size='sm' color='light-blue'>
                <DropdownMenuTrigger className='w-fit bg-light-blue'>
                  {sendingGiftForm.role === 'PARTICIPANT' ? 'N' : 'P'}
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    {['P', 'N'].map(role => (
                      <DropdownMenuItem
                        key={role}
                        onClick={() =>
                          setSendingGiftForm(prev => ({
                            ...prev,
                            role: role === 'P' ? 'STAFF' : 'PARTICIPANT',
                          }))
                        }
                      >
                        {role}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Input
                value={sendingGiftForm.id}
                onChange={e => {
                  const value = e.target.value
                  if (/^\d*$/.test(value)) {
                    setSendingGiftForm(prev => ({
                      ...prev,
                      id: value,
                    }))
                  }
                }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className='w-full flex justify-center items-center gap-2 flex-wrap'>
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                setOpenSendingGiftPopup(false)
                setSendingGiftForm({
                  role: user.role,
                  id: '',
                })
              }}
            >
              <ArrowBack fontSize='small' />
              <p>ย้อนกลับ</p>
            </Button>
            <Button size='sm' type='submit' disabled={sendingGiftForm.id == ''}>
              ต่อไป
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SendingGiftPopup
