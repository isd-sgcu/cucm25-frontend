import { formatDateTime } from '@/utils/function'
import { Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { UserRoleType } from '@/utils/const'

interface ActivityHistoryCardProps {
  activity_code: string
  activity_name: string
  reward_coin: number
  created_at: string
  expires_at: string
  role: UserRoleType
}

export default function ActivityHistoryCard({
  activity_code,
  activity_name,
  reward_coin,
  created_at,
  expires_at,
  role,
}: ActivityHistoryCardProps) {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(activity_code)
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-2.5 border rounded-2xl shadow-make-cartoonish p-4',
        role === 'senior' ? 'bg-light-light-pink' : 'bg-light-yellow'
      )}
    >
      <div className='flex flex-row justify-between gap-4 flex-wrap items-start'>
        <p className='line-clamp-1 title-large-emphasized' title={activity_name}>
          {activity_name}
        </p>
        <p className='title-large-emphasized text-green'>{'+' + reward_coin}</p>
      </div>
      <div className='flex flex-row items-center gap-4'>
        <p className='title-medium'>Code กิจกรรม</p>
        <div className='flex flex-row items-center justify-center gap-4 shadow-make-cartoonish border rounded-full bg-white w-36 -rotate-1'>
          <p className='title-medium'>{activity_code}</p>
          <button onClick={handleCopyCode} className='cursor-pointer'>
            <Copy size={14} />
          </button>
        </div>
      </div>
      <div className='flex flex-row justify-between flex-wrap items-center body-small'>
        <p>{'สร้าง ' + formatDateTime(created_at) + ' น.'}</p>
        <p>{'หมดอายุ ' + formatDateTime(expires_at) + ' น.'}</p>
      </div>
    </div>
  )
}
