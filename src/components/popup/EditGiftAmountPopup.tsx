import { Button } from '../ui/button'
import { ArrowBack } from '@mui/icons-material'
import { IconBox } from '../ui/icon-box'
import { Icon } from '@iconify/react'
import { Minus, Plus } from 'lucide-react'
import { Input } from '../ui/input'
import { useState } from 'react'

interface EditGiftAmountPopupProps {
  setOpenEditGiftAmountPopup: (bool: boolean) => void
}

function EditGiftAmountPopup({ setOpenEditGiftAmountPopup }: EditGiftAmountPopupProps) {
  const [giftAmount, setGiftAmount] = useState<number>(7)
  const [step, setStep] = useState<number>(1)
  const [isSuccess, setIsSuccess] = useState<boolean>(true)

  const handleClosePopup = () => {
    setOpenEditGiftAmountPopup(false)
  }

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1)
  }

  const handlePreviousStep = () => {
    setStep(prevStep => prevStep - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit logic here
    setIsSuccess(true)
    handleNextStep()
  }

  return (
    <>
      {/* Overlay */}
      <div className='fixed inset-0 bg-black/70 backdrop-blur-sm z-40'></div>

      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <form
          className='max-w-md w-[80%] flex flex-col gap-4 items-center bg-white rounded-2xl p-6'
          onSubmit={handleSubmit}
        >
          {/* Header */}
          <div className='w-full flex flex-col items-center gap-2'>
            <IconBox bgcolor='light-blue' className='w-18 h-18'>
              <Icon icon='solar:gift-linear' color='black' className='w-12 h-12' />
            </IconBox>
            <div>
              <p className='title-large-emphasized text-center'>{
                step === 1 ?
                  "แก้จำนวนของขวัญ"
                  : isSuccess ? "แก้จำนวนของขวัญสำเร็จ" : "แก้จำนวนของขวัญไม่สำเร็จ"
              }</p>
              <p className='title-small text-center'>จำนวนของขวัญที่ส่งได้ใน 1 ชั่วโมง</p>
            </div>
          </div>

          {/* Form */}
          {
            step === 1 && (
              <>
                <div className='w-full flex flex-col'>
                  <div className='flex flex-row gap-4 items-center justify-center'>
                    <button
                      type='button'
                      onClick={() => setGiftAmount(giftAmount > 0 ? giftAmount - 1 : giftAmount)}
                      className='cursor-pointer'
                    >
                      <Minus size={16} />
                    </button>
                    <Input
                      value={giftAmount}
                      onChange={e => {
                        const value = e.target.valueAsNumber;
                        setGiftAmount(isNaN(value) ? 1 : Math.max(value, 1));
                      }}
                      type='number'
                      id='giftAmount'
                      min={1}
                      inputSize={'md'}
                      inputClassName='text-center title-small'
                      containerClassName='w-fit'
                    />
                    <button
                      type='button'
                      onClick={() => setGiftAmount(giftAmount + 1)}
                      className='cursor-pointer'
                    >
                      <Plus size={16} />
                    </button>
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
                  >
                    ต่อไป
                  </Button>
                </div>
              </>
            )}

          {step === 2 && (
            isSuccess ? (
              <>
                <Input
                  value={giftAmount}
                  readOnly
                  type='numeric'
                  id='giftAmount'
                  min={1}
                  inputSize={'md'}
                  inputClassName='text-center title-small'
                  containerClassName='w-fit'
                />
                <Button
                  size='custom'
                  className='rounded-full px-3 py-1.5 flex gap-1 w-fit min-w-24'
                  onClick={() => handleClosePopup()}
                >
                  ตกลง
                </Button>
              </>) : (
              <>
                <p>เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง</p>
                <Button
                  size='custom'
                  className='rounded-full px-3 py-1.5 flex gap-1 w-fit min-w-24 justify-center items-center'
                  variant='outline'
                  onClick={() => handlePreviousStep()}
                >
                  <ArrowBack fontSize='small' />
                  <p>ย้อนกลับ</p>
                </Button>
              </>
            )
          )}
        </form>
      </div>
    </>
  )
}

export default EditGiftAmountPopup;