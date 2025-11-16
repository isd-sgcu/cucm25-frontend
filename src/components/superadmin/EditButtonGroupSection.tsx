import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Gift } from 'lucide-react'
import { useState, useEffect } from 'react'
import EditGiftAmountPopup from '../popup/EditGiftAmountPopup'
import EditTicketPricePopup from '../popup/EditTicketPricePopup'
import EditCoinAmountPopup from '../popup/EditCoinAmountPopup'

function EditButtonGroupSection() {
  const [ticketPrice, setTicketPrice] = useState<number>(0)
  const navigate = useNavigate()
  const [openEditGiftAmountPopup, setOpenEditGiftAmountPopup] = useState<boolean>(false)
  const [openEditTicketPricePopup, setOpenEditTicketPricePopup] = useState<boolean>(false)
  const [openEditCoinAmountPopup, setOpenEditCoinAmountPopup] = useState<boolean>(false)

  const handleCreateActivityClick = (type: string) => {
    navigate('/superadmin/create-activity/?role=' + type)
  }

  useEffect(() => {
    setTicketPrice(500)
  }, [])

  return (
    <>
      <div className='grid grid-cols-2 gap-2'>
        {/* แก้จำนวนของขวัญ */}
        <Button
          size={'custom'}
          className='w-full h-auto shadow-make-cartoonish body-large col-span-2 border border-black p-4 rounded-xl'
          onClick={() => setOpenEditGiftAmountPopup(true)}
          color={'light-blue'}
        >
          <Gift className='size-12' strokeWidth={1} />
          <p className='title-medium-emphasized'>แก้จำนวนของขวัญ</p>
        </Button>
        {/* สร้าง Code รับ Coin พี่ค่าย */}
        <Button
          size={'custom'}
          className='w-full col-span-1 h-auto shadow-make-cartoonish body-large border border-black p-4 rounded-xl flex flex-col text-center'
          onClick={handleCreateActivityClick.bind(null, 'senior')}
          color={'light-pink'}
        >
          <p className='title-medium-emphasized'>สร้าง Code รับ Coin</p>
          <p className='body-medium'>สำหรับพี่ค่าย</p>
        </Button>
        {/* สร้าง Code รับ Coin สำหรับน้องค่าย */}
        <Button
          size={'custom'}
          className='w-full col-span-1 h-auto shadow-make-cartoonish body-large border border-black p-4 rounded-xl flex flex-col text-center'
          onClick={handleCreateActivityClick.bind(null, 'junior')}
          color={'yellow'}
        >
          <p className='title-medium-emphasized'>สร้าง Code รับ Coin</p>
          <p className='body-medium'>สำหรับน้องค่าย</p>
        </Button>
        {/* ตั้งค่าราคา Ticket */}
        <Button
          size={'custom'}
          className='w-full col-span-1 h-auto shadow-make-cartoonish body-large border border-black p-4 rounded-xl flex flex-col text-center'
          onClick={() => setOpenEditTicketPricePopup(true)}
          color={'light-purple'}
        >
          <p className='title-medium-emphasized'>ตั้งค่าราคา Ticket</p>
          <p className='body-medium'>ราคาปัจจุบัน {ticketPrice} coin</p>
        </Button>
        {/* Export ข้อมูล Ticket */}
        <Button
          size={'custom'}
          className='w-full col-span-1 h-auto shadow-make-cartoonish body-large border border-black p-4 rounded-xl flex flex-col text-center'
          onClick={() => navigate('/superadmin/export-ticket')}
          color={'grey'}
        >
          <p className='title-medium-emphasized'>Export</p>
          <p className='body-medium'>ข้อมูล Ticket</p>
        </Button>
        {/* เพิ่ม / ลด เหรียญรายบุคคล */}
        <Button
          size={'custom'}
          className='w-full h-auto shadow-make-cartoonish body-large col-span-2 border border-black p-4 rounded-xl'
          onClick={() => setOpenEditCoinAmountPopup(true)}
          color={'light-blue'}
        >
          <p className='title-medium-emphasized'>เพิ่ม / ลด เหรียญรายบุคคล</p>
        </Button>
      </div>

      {openEditGiftAmountPopup && (
        <EditGiftAmountPopup setOpenEditGiftAmountPopup={setOpenEditGiftAmountPopup} />
      )}

      {openEditTicketPricePopup && (
        <EditTicketPricePopup setOpenEditTicketPricePopup={setOpenEditTicketPricePopup} />
      )}

      {openEditCoinAmountPopup && (
        <EditCoinAmountPopup setOpenEditCoinAmountPopup={setOpenEditCoinAmountPopup} />
      )}
    </>
  )
}

export default EditButtonGroupSection
