import { Button } from '../ui/button'
import { ArrowBack } from '@mui/icons-material'
import { IconBox } from '../ui/icon-box'
import { Gift, Minus, Plus } from 'lucide-react'
import { Input } from '../ui/input'
import { useState } from 'react'

interface EditGiftAmountPopupProps {
  setOpenEditGiftAmountPopup: (bool: boolean) => void
}

function EditGiftAmountPopup({ setOpenEditGiftAmountPopup }: EditGiftAmountPopupProps) {
  const [giftAmount, setGiftAmount] = useState<number>(7)
  
  const handleClosePopup = () => {
    setOpenEditGiftAmountPopup(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit logic here
    handleClosePopup()
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
              <Gift color='black' className='w-12 h-12' />
            </IconBox>
            <div>
              <p className='title-large-emphasized text-center'>แก้จำนวนของขวัญ</p>
              <p className='title-small text-center'>จำนวนของขวัญที่ส่งได้ใน 1 ชั่วโมง</p>
            </div>
          </div>

          {/* Form */}
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
                  setGiftAmount(Math.max(e.target.valueAsNumber, 1))
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
        </form>
      </div>
    </>
  )
}

export default EditGiftAmountPopup;