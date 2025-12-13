import ActivityHistoryCard from './ActivityHistoryCard'
import { getCodeHistory, type CodeHistoryInterface } from '@/api/code'
import { useEffect, useState } from 'react';

export default function ActivityHistoryCardList() {
  const [codeHistory, setCodeHistory] = useState<CodeHistoryInterface[]>([]);

  useEffect(() => {
    const fetchCodeHistory = async () => {
      const history = await getCodeHistory();
      setCodeHistory(history);
    };
    fetchCodeHistory();
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      <p className='headline-small-emphasized'>ประวัติการสร้าง</p>
      <div className='flex flex-col gap-6'>
        {codeHistory.length === 0 ? (
          <p className='body-medium text-center text-gray-500 py-4'>
            ยังไม่มีประวัติการสร้างกิจกรรม
          </p>
        ) : (
          codeHistory.filter(e => new Date(e.expires_at) > new Date()).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map(activity => (
            <ActivityHistoryCard
              key={activity.id}
              activity_code={activity.code_string}
              activity_name={activity.activity_name}
              reward_coin={activity.reward_coin}
              created_at={activity.created_at}
              expires_at={activity.expires_at}
              role={activity.target_role as 'junior' | 'senior'}
            />
          ))
        )}
      </div>
    </div>
  )
}
