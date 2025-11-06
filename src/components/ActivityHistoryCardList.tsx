import ActivityHistoryCard from './ActivityHistoryCard'
import type { ActivityInterface } from '@/interface/ActivityInterface'

export default function ActivityHistoryCardList() {
  const mockCreateHistory: ActivityInterface[] = [
    {
      activity_code: '001',
      activity_name: 'Clean your room',
      reward_coin: 50,
      reward_exp: 20,
      max_usages: 5,
      target_role: 'junior',
      created_at: '2024-06-01T10:00:00Z',
      expires_at: '2024-12-31T23:59:59Z',
    },
    {
      activity_code: '002',
      activity_name: 'Finish homework',
      reward_coin: 100,
      reward_exp: 40,
      max_usages: 3,
      target_role: 'junior',
      created_at: '2024-06-05T14:30:00Z',
      expires_at: '2024-11-30T23:59:59Z',
    },
  ]

  return (
    <div className='flex flex-col gap-4'>
      <p className='headline-small-emphasized'>ประวัติการสร้าง</p>
      <div className='flex flex-col gap-6'>
        {mockCreateHistory.length === 0 ? (
          <p className='body-medium text-center text-gray-500 py-4'>
            ยังไม่มีประวัติการสร้างกิจกรรม
          </p>
        ) : (
          mockCreateHistory.map(activity => (
            <ActivityHistoryCard
              key={activity.activity_code}
              activity_code={activity.activity_code}
              activity_name={activity.activity_name}
              reward_coin={activity.reward_coin}
              created_at={activity.created_at}
              expires_at={activity.expires_at}
              role={activity.target_role}
            />
          ))
        )}
      </div>
    </div>
  )
}
