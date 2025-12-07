import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div className='w-full h-fit min-h-screen bg-light-yellow flex flex-col p-6 justify-center items-center'>
      <h1 className='text-3xl text-black font-bold mb-4'>เกิดข้อผิดพลาด</h1>
      <p className='text-black mb-8 text-center'>เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง</p>
      <Button
        variant='default'
        className='flex items-center gap-2 rounded-2xl p-2 w-full h-10'
        color='white'
        cartoonish
        onClick={() => {
          navigate(-1)
        }}
      >
        <p className='title-medium'>
          <span className='font-semibold'>ย้อนกลับ</span>
        </p>
      </Button>
    </div>
  )
}