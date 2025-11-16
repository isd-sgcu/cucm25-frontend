import { Button } from '../ui/button'
import { ArrowBack } from '@mui/icons-material'
import { IconBox } from '../ui/icon-box'
import { Minus, Plus } from 'lucide-react'
import { Icon } from '@iconify/react'
import { Input } from '../ui/input'
import { useState, useEffect } from 'react'

interface EditTicketPricePopupProps {
  setOpenEditTicketPricePopup: (bool: boolean) => void
}

function EditTicketPricePopup({ setOpenEditTicketPricePopup }: EditTicketPricePopupProps) {
  const [ticketPrice, setTicketPrice] = useState<number>(0)
  const [step, setStep] = useState<number>(1)
  const [isSuccess, setIsSuccess] = useState<boolean>(true)

  const handleClosePopup = () => {
    setStep(1)
    setIsSuccess(false)
    setOpenEditTicketPricePopup(false)
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

  useEffect(() => {
    // fetch current ticket price from server
    setTicketPrice(50)
  }, [])

  return (
    <>
      {/* Overlay */}
      <div className='fixed inset-0 bg-black/70 backdrop-blur-sm z-40'></div>

      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <form
          className='max-w-md w-[80%] flex flex-col gap-4 items-center bg-white rounded-2xl p-6 shadow-make-cartoonish'
          onSubmit={handleSubmit}
        >
          {/* Header */}
          <div className='w-full flex flex-col items-center gap-2'>
            <IconBox bgcolor='light-purple' className='w-18 h-18'>
              <Icon icon='solar:ticket-broken' color='black' className='w-12 h-12 -rotate-90' />
            </IconBox>
            <div>
              <p className='title-large-emphasized text-center'>
                {step === 1
                  ? 'แก้ไขราคา Ticket'
                  : isSuccess
                    ? 'แก้ไขราคา Ticket สำเร็จ'
                    : 'แก้ไขราคา Ticket ไม่สำเร็จ'}
              </p>
              <p className='title-small text-center'>ราคาต่อ Ticket 1 ใบ</p>
            </div>
          </div>

          {/* Form */}
          {step === 1 && (
            <>
              <div className='w-full flex flex-col'>
                <div className='flex flex-row gap-4 items-center justify-center'>
                  <button
                    type='button'
                    onClick={() => setTicketPrice(ticketPrice > 0 ? ticketPrice - 1 : ticketPrice)}
                    className='cursor-pointer'
                  >
                    <Minus size={16} />
                  </button>
                  <Input
                    value={ticketPrice}
                    onChange={e => {
                      setTicketPrice(Number(e.target.value))
                    }}
                    inputMode='numeric'
                    id='ticketPrice'
                    min={1}
                    inputSize={'md'}
                    inputClassName='text-center title-small'
                    containerClassName='w-fit'
                  />
                  <button
                    type='button'
                    onClick={() => setTicketPrice(ticketPrice + 1)}
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
                  ยืนยัน
                </Button>
              </div>
            </>
          )}

          {step === 2 &&
            (isSuccess ? (
              <>
                <Input
                  value={ticketPrice}
                  readOnly
                  type='text'
                  id='ticketPrice'
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
              </>
            ) : (
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
            ))}
        </form>
      </div>
    </>
  )
}

export default EditTicketPricePopup
