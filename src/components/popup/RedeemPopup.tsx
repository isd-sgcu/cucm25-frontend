import { useState } from 'react'
import { IconBox } from '../ui/icon-box'
import { Icon } from '@iconify/react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowBack } from '@mui/icons-material'

import { redeem } from '@/api/code'
import { useUser } from '@/context/User'

interface RedeemPopupProps {
  setOpenRedeemPopup: (bool: boolean) => void
}

function RedeemPopup({ setOpenRedeemPopup: setOpenRedeemPopup }: RedeemPopupProps) {
  const { setUser } = useUser()
  const [step, setStep] = useState<1 | 2>(1)
  const [redeemForm, setRedeemForm] = useState<{
    eventLetter: string
    eventNumber: string
  }>({ eventLetter: '', eventNumber: '' })
  const [isSuccess, setSuccess] = useState(false)
  const [eventName, setEventName] = useState('')
  const [coinReceived, setCoinReceived] = useState(0)
  const [resultLoading, setResultLoading] = useState(false)

  async function handleSubmitStep1(e: React.FormEvent) {
    setResultLoading(true)
    e.preventDefault()
    setStep(2)
    const codeString = redeemForm.eventLetter.concat(redeemForm.eventNumber)
    try {
      const result = await redeem(codeString)
      if (result.success) {
        const prefix = 'Successfully redeemed code: '
        const eventName = result.message.substring(prefix.length)
        setEventName(eventName)
        setCoinReceived(result.rewardCoin)
        setUser(prev => {
          if (!prev) return prev

          return {
            ...prev,
            wallets: {
              ...prev.wallets,
              coin_balance: prev.wallets.coin_balance + result.rewardCoin,
              cumulative_coin: prev.wallets.cumulative_coin + result.rewardCoin,
            },
          }
        })
      }
      setSuccess(result.success)
      setResultLoading(false)
    } catch (error) {
      setSuccess(false)
      setResultLoading(false)
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
            className='max-w-md w-[80%] flex flex-col gap-8 items-center bg-white rounded-2xl p-6'
            onSubmit={handleSubmitStep1}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
          >
            {/* Header */}
            <div className='w-full flex flex-col items-center gap-2'>
              <IconBox bgcolor='pink' className='w-18 h-18'>
                <Icon icon='solar:stars-outline' color='black' className='w-12 h-12' />
              </IconBox>
              <p className='title-large text-center'>
                <span className='font-semibold'>รับเหรียญ</span>
              </p>
            </div>

            {/* Form */}
            <div className='w-full flex flex-col'>
              <p className='label-large'>
                <span className='font-semibold'>กรอกรหัสกิจกรรม</span>
              </p>
              <div className='w-full flex gap-2 items-center'>
                <Input
                  inputSize='sm'
                  inputClassName={`${redeemForm.eventLetter ? 'bg-pink' : ''} max-w-20`}
                  containerClassName='w-fit'
                  placeholder='X'
                  value={redeemForm.eventLetter}
                  onChange={e => {
                    const value = e.target.value.toUpperCase()
                    if (/^[A-Z]?$/.test(value)) {
                      setRedeemForm(prev => ({
                        ...prev,
                        eventLetter: value,
                      }))
                    }
                  }}
                />

                <Input
                  value={redeemForm.eventNumber}
                  placeholder='000'
                  onChange={e => {
                    const value = e.target.value
                    if (/^\d*$/.test(value)) {
                      setRedeemForm(prev => ({
                        ...prev,
                        eventNumber: value,
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
                  setOpenRedeemPopup(false)
                  setRedeemForm({
                    eventLetter: '',
                    eventNumber: '',
                  })
                }}
              >
                <ArrowBack fontSize='small' />
                <p>ย้อนกลับ</p>
              </Button>
              <Button
                size='sm'
                type='submit'
                disabled={redeemForm.eventLetter == '' || redeemForm.eventNumber == ''}
              >
                ต่อไป
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Step 2 */}
      {step === 2 && !resultLoading && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div className='max-w-md w-[80%] flex flex-col gap-8 items-center bg-white rounded-2xl'>
            {/* Header */}
            <div
              className={`w-full flex flex-col items-center p-6 gap-2 rounded-t-2xl ${
                isSuccess ? 'bg-green' : 'bg-red'
              }`}
            >
              <Icon
                icon={isSuccess ? 'solar:star-shine-outline' : 'solar:star-rings-linear'}
                color='white'
                className='w-14 h-14'
              />
              <p className='title-large text-white text-center'>
                {isSuccess ? 'รับเหรียญสำเร็จ' : 'รับเหรียญไม่สำเร็จ'}
              </p>
            </div>

            {/* Content */}
            <div className='w-full flex flex-col items-center px-6'>
              {!isSuccess ? (
                <>
                  <p className='title-large mb-2 text-center'>
                    <span className='font-semibold'>ไม่สามารถรับเหรียญได้</span>
                  </p>
                  <p className='title-small text-center'>
                    กรุณาตรวจสอบรหัสให้ถูกต้อง หรืออาจเป็นรหัสที่ถูกใช้ไปแล้ว
                  </p>
                </>
              ) : (
                <>
                  <p className='headline-large mb-2 bg-pink text-center rounded-full w-fit px-3 py-1 border shadow-make-cartoonish-2'>
                    {coinReceived} เหรียญ
                  </p>
                  <p className='label-medium text-center'>จากกิจกรรม {eventName}</p>
                </>
              )}
            </div>

            {/* Buttons */}
            <div className='w-full flex justify-center items-center gap-2 flex-wrap pb-6 px-6'>
              <Button
                onClick={() => {
                  if (isSuccess) {
                    setOpenRedeemPopup(false)
                  } else {
                    setStep(1)
                  }
                }}
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

export default RedeemPopup
