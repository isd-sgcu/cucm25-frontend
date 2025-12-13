import { useState } from 'react'
import { IconBox } from '../ui/icon-box'
import { Icon } from '@iconify/react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowBack } from '@mui/icons-material'
import { Plus, Minus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import clsx from 'clsx'
import type { UserInterface } from '@/interface/user'
import { formatDateTime } from '@/utils/function'
import { adjustCoin, getUser } from '@/api/user'

interface EditCoinAmountPopupProps {
  setOpenEditCoinAmountPopup: (bool: boolean) => void
}

/**
 * Renders a two-step modal UI for adding or subtracting coins for a target user.
 *
 * The component manages its own form state, validation, success/failure state, and a timestamped result view.
 *
 * @param setOpenEditCoinAmountPopup - Callback to update the popup open state; called with `false` to close the modal.
 * @returns The JSX element for the edit-coin modal, including step 1 (form) and step 2 (result summary).
 */
function EditCoinAmountPopup({ setOpenEditCoinAmountPopup }: EditCoinAmountPopupProps) {
  const [step, setStep] = useState<number>(1)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [data, setData] = useState<{
    isAddCoin: boolean
    coin: number | null
    role: 'senior' | 'junior'
    targetId: string
  }>({
    isAddCoin: true,
    coin: null,
    role: 'senior',
    targetId: '',
  })
  const [target, setTarget] = useState<UserInterface | null>(null)
  const [timeStamp, setTimeStamp] = useState<string>('')

  const handleClosePopup = () => {
    setData({
      isAddCoin: true,
      coin: null,
      role: 'senior',
      targetId: '',
    })
    setOpenEditCoinAmountPopup(false)
  }

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1)
  }

  const handlePreviousStep = () => {
    setStep(prevStep => prevStep - 1)
  }

  const handleSubmit = async () => {
    if (!data.coin || data.coin <= 0 || data.targetId.trim() === '') {
      setIsSuccess(false)
      return;
    }

    try {
      let name = data.role === 'senior' ? 'p' + data.targetId : 'n' + data.targetId
      name = name.toLowerCase()
      const userResponse = await getUser(name)
      if (userResponse.user) {
        setTarget(userResponse.user)
        await adjustCoin({
          username: userResponse.user.username,
          action: data.isAddCoin ? 'increment' : 'decrement',
          amount: data.coin,
        })
        setIsSuccess(true)
        const now = new Date()
        setTimeStamp(formatDateTime(now.toLocaleString()))
      } else {
        setIsSuccess(false)
      }
    } catch (error) {
      console.error('Error adjusting coin:', error)
      setIsSuccess(false) 
    } finally {
      handleNextStep()
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
            className='max-w-md w-[80%] flex flex-col gap-8 pb-4 items-center bg-white rounded-2xl px-6 shadow-make-cartoonish'
            onSubmit={e => {
              e.preventDefault()
              handleSubmit()
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
          >
            <div className='flex flex-col w-full items-center gap-4'>
              {/* Header */}
              <div className='w-full flex flex-col items-center gap-2 py-2'>
                <IconBox bgcolor='yellow' className='w-18 h-18'>
                  <Icon icon='solar:stars-outline' color='black' className='w-12 h-12' />
                </IconBox>
                <p className='title-large-emphasized text-center'>จัดการเหรียญ</p>
              </div>

              {/* Form */}
              <div className='w-full flex flex-col gap-4'>
                <div className='w-full flex gap-2 items-center'>
                  <Button
                    size={'custom'}
                    type='button'
                    className='rounded-xl w-18 h-12'
                    cartoonish
                    color={data.isAddCoin ? 'green' : 'red'}
                    onClick={() => {
                      setData({
                        ...data,
                        isAddCoin: !data.isAddCoin,
                      })
                    }}
                  >
                    {data.isAddCoin ? <Plus size={16} /> : <Minus size={16} />}
                  </Button>

                  <Input
                    value={data.coin ?? ''}
                    inputMode='numeric'
                    min={0}
                    placeholder='000'
                    onChange={e => {
                      const { value } = e.target
                      if (/^\d*$/.test(value)) {
                        setData(prev => ({
                          ...prev,
                          coin: value === '' ? 0 : Number(value),
                        }))
                      }
                    }}
                    inputClassName='h-12'
                  />
                </div>

                <div className='w-full flex flex-col gap-2'>
                  <label htmlFor='target' className='title-medium-emphasized'>
                    กรอก Username
                  </label>
                  <div className='w-full flex gap-2 items-center'>
                    <DropdownMenu size='sm' color='light-blue'>
                      <DropdownMenuTrigger className='w-fit bg-light-blue'>
                        {data.role === 'senior' ? 'P' : 'N'}
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className='mt-1'>
                        <DropdownMenuGroup>
                          {['P', 'N'].map(role => (
                            <DropdownMenuItem
                              key={role}
                              onClick={() => {
                                setData(prev => ({
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
                      value={data.targetId}
                      type='text'
                      placeholder='กรอก Username'
                      onChange={e => {
                        const { value } = e.target
                        if (/^[a-zA-Z0-9]*$/.test(value)) {
                          setData({
                            ...data,
                            targetId: value,
                          })
                        }
                      }}
                      inputClassName='h-12'
                    />
                  </div>
                </div>
              </div>
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
                disabled={!data.coin || data.coin <= 0 || data.targetId.trim() === ''}
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
          <div className='max-w-md w-[80%] flex flex-col gap-4 items-center bg-white rounded-2xl shadow-make-cartoonish'>
            {/* Header */}
            <div
              className={clsx(
                'w-full flex flex-col items-center pt-2 pb-2 gap-2 rounded-t-2xl',
                isSuccess ? (data.isAddCoin ? 'bg-green' : 'bg-purple') : 'bg-red'
              )}
            >
              <Icon icon='solar:star-shine-outline' color='white' className='w-14 h-14' />
              <p className='title-large text-white text-center'>
                {data.isAddCoin
                  ? isSuccess
                    ? 'เพิ่มเหรียญสำเร็จ'
                    : 'เพิ่มเหรียญไม่สำเร็จ'
                  : isSuccess
                    ? 'ลดเหรียญสำเร็จ'
                    : 'ลดเหรียญไม่สำเร็จ'}
              </p>
            </div>

            {/* Content */}
            <div className='w-full flex flex-col items-center gap-2 px-6 mb-2'>
              {!isSuccess ? (
                <>
                  <p className='title-large text-center'>
                    <span className='font-semibold'>เกิดข้อผิดพลาด</span>
                  </p>
                  <p className='title-small text-center'>
                    ตรวจสอบจำนวนเหรียญหรือสอบถามรหัสให้ถูกต้องอีกครั้ง
                  </p>
                </>
              ) : (
                <>
                  <p className='headline-large-emphasized bg-yellow text-center rounded-full w-fit px-3 py-1 border shadow-make-cartoonish-2'>
                    {data.coin} เหรียญ
                  </p>
                  <div className='mt-1'>
                    <p className='label-medium text-center'>
                      ชื่อ {target?.firstname} นามสกุล {target?.lastname}
                    </p>
                    <p className='label-medium text-center'>จ่ายแล้วเมื่อ {timeStamp}</p>
                  </div>
                </>
              )}
            </div>

            {/* Buttons */}
            <div className='w-full flex justify-center items-center gap-2 flex-wrap pb-4 px-6'>
              <Button
                size='custom'
                className='rounded-full px-3 py-1.5 flex gap-1 w-fit min-w-24'
                type='button'
                onClick={isSuccess ? handleClosePopup : handlePreviousStep}
              >
                ตกลง
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EditCoinAmountPopup