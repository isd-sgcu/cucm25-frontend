import { useState } from 'react'
import { IconBox } from '../ui/icon-box'
import { Icon } from '@iconify/react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowBack } from '@mui/icons-material'
import { formatDateTime } from '@/utils/function'
import { pay, type PayFormInterface } from '@/api/user'
import { useUser } from '@/context/User'

interface PayingCoinPopupProps {
  setOpenPayingCoinPopup: (bool: boolean) => void
}

function PayingCoinPopup({ setOpenPayingCoinPopup }: PayingCoinPopupProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const { setUser } = useUser()

  const [payForm, setPayForm] = useState<PayFormInterface>({
    amount: 0,
  })
  const [isSuccess, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [timeStamp, setTimestamp] = useState('')

  function handleSubmitStep1(e: React.FormEvent) {
    e.preventDefault()
    setStep(2)
  }

  async function handleSubmitStep2(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      await pay(payForm)
      setSuccess(true)
      setUser(prev => {
        if (!prev) return prev

        return {
          ...prev,
          wallets: {
            ...prev.wallets,
            coin_balance: prev.wallets.coin_balance - payForm.amount,
          },
        }
      })
      const now = new Date()
      const nowString = formatDateTime(now.toISOString())
      setTimestamp(nowString)
    } catch (err) {
      console.log(err)
      setSuccess(false)
    }

    setLoading(false)
    setStep(3)
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
              <IconBox bgcolor='yellow' className='w-18 h-18'>
                <Icon icon='solar:star-circle-linear' color='black' className='w-12 h-12' />
              </IconBox>
              <p className='title-large text-center'>
                <span className='font-semibold'>จ่ายด้วยเหรียญ</span>
              </p>
            </div>

            {/* Form */}
            <div className='w-full flex flex-col gap-2'>
              <Input
                label='ระบุจำนวนเหรียญ (ไม่เกิน 100000 เหรียญ)'
                value={payForm.amount}
                onChange={e => {
                  const value = Number(e.target.value)
                  if (Number.isInteger(value) && value >= 0 && value <= 100000) {
                    setPayForm({ amount: value })
                  }
                }}
              />

              <Input label='บัญชีปลายทาง' value='บัญชีกลางค่ายจุฬา-เชียงใหม่' readOnly />

              <p className='label-small text-red text-center'>
                *โปรดตรวจสอบให้ถี่ถ้วนก่อนยืนยัน โดยไม่สามารถแก้ไขธุรกรรมหากโอนแล้ว
              </p>
            </div>

            {/* Buttons */}
            <div className='w-full flex justify-center items-center gap-2 flex-wrap'>
              <Button
                size='sm'
                variant='outline'
                onClick={() => {
                  setOpenPayingCoinPopup(false)
                  setPayForm({
                    amount: 0,
                  })
                }}
              >
                <ArrowBack fontSize='small' />
                <p>ย้อนกลับ</p>
              </Button>
              <Button size='sm' type='submit' disabled={payForm.amount == 0}>
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
            className='max-w-md w-[80%] flex flex-col gap-8 items-center bg-white rounded-2xl p-6'
            onSubmit={handleSubmitStep2}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
          >
            {/* Header */}
            <div className='w-full flex flex-col items-center gap-2'>
              <IconBox bgcolor='yellow' className='w-18 h-18'>
                <Icon icon='solar:star-circle-linear' color='black' className='w-12 h-12' />
              </IconBox>
              <p className='title-large text-center'>
                <span className='font-semibold'>ตรวจสอบข้อมูล</span>
              </p>
            </div>

            {/* Content */}
            <div className='w-full flex flex-col items-center'>
              <p className='label-large text-center mb-1'>จ่ายจำนวนเหรียญ</p>
              <p className='headline-large mb-2 text-center bg-yellow rounded-full w-fit px-3 py-1 border shadow-make-cartoonish-2'>
                {payForm.amount} เหรียญ
              </p>
              <p className='label-large text-center mb-1'>บัญชีปลายทาง</p>
              <p className='label-large text-center mb-1'>บัญชีกลางค่ายจุฬา-เชียงใหม่</p>
              <p className='label-small text-red text-center'>
                *โปรดตรวจสอบให้ถี่ถ้วนก่อนยืนยัน โดยไม่สามารถแก้ไขธุรกรรมหากโอนแล้ว
              </p>
            </div>

            {/* Buttons */}
            <div className='w-full flex justify-center items-center gap-2 flex-wrap'>
              <Button
                size='sm'
                variant='outline'
                disabled={loading}
                onClick={() => {
                  setStep(1)
                }}
              >
                <ArrowBack fontSize='small' />
                <p>ย้อนกลับ</p>
              </Button>
              <Button size='sm' type='submit' disabled={loading}>
                {loading ? 'กำลังส่ง...' : 'ต่อไป'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Step 3 */}
      {!loading && step == 3 && (
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
                {isSuccess ? 'ส่งเหรียญสำเร็จ' : 'ส่งเหรียญไม่สำเร็จ'}
              </p>
            </div>

            {/* Content */}
            <div className='w-full flex flex-col items-center px-6'>
              {!isSuccess ? (
                <>
                  <p className='title-large text-center mb-2'>
                    <span className='font-semibold'>ระบุจำนวนเหรียญผิดพลาด</span>
                  </p>
                  <p className='title-small text-center'>ตรวจสอบจำนวนเหรียญที่ต้องใช้อีกครั้ง</p>
                </>
              ) : (
                <>
                  <p className='headline-large mb-2 bg-yellow text-center rounded-full w-fit px-3 py-1 border shadow-make-cartoonish-2'>
                    {payForm.amount} เหรียญ
                  </p>
                  <p className='label-medium text-center'>จ่ายแล้วเมื่อ {timeStamp}</p>
                </>
              )}
            </div>

            {/* Buttons */}
            <div className='w-full flex justify-center items-center gap-2 flex-wrap pb-6 px-6'>
              <Button
                onClick={() => {
                  if (isSuccess) {
                    setOpenPayingCoinPopup(false)
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

export default PayingCoinPopup
