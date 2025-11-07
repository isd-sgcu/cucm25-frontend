import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { Copy } from 'lucide-react'

interface CreateActivityDisplayProps {
  activityCode: string
  activityName: string
  coinReward: number
  expiresAt: string
}

export default function CreateActivityDisplay({
  activityCode,
  activityName,
  coinReward,
  expiresAt,
}: CreateActivityDisplayProps) {
  const navigate = useNavigate()
  const handleCopyCode = () => {
    navigator.clipboard.writeText(activityCode)
  }

  return (
    <div className='flex flex-col gap-6 px-6 w-full'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <p className='title-medium-emphasized'>Code ของกิจกรรม</p>
          <div className='mx-auto flex flex-row items-center justify-center gap-4 shadow-make-cartoonish border rounded-full bg-white h-16 min-w-64'>
            <p className='headline-large-emphasized'>{activityCode}</p>
            <button onClick={handleCopyCode} className='cursor-pointer hover:size-[0.9]'>
              <Copy size={24} />
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='title-medium-emphasized'>ชื่อกิจกรรม</p>
          <p className='title-large-emphasized px-4'>{activityName}</p>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='title-medium-emphasized'>จำนวนเหรียญ</p>
          <div className='flex flex-row items-center justify-center gap-1'>
            <p className='title-large-emphasized'>{coinReward}</p>
            <img src='/solar_jar-of-pills-linear.png' alt='' className='w-6' />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='title-medium-emphasized'>วัน เวลา หมดอายุ</p>
          <p className='title-large-emphasized text-center'>{expiresAt + ' น.'}</p>
        </div>
      </div>
      <Button
        className='flex flex-row items-center gap-2 rounded-full px-5 py-2.5 w-fit shadow-elevation-1 mx-auto'
        size={'custom'}
        onClick={() => navigate('/moderator')}
      >
        กลับหน้าหลัก
      </Button>
    </div>
  )
}
