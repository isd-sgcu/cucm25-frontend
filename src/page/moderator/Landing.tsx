import { useNavigate } from 'react-router-dom'
import ActivityHistoryCardList from '@/components/ActivityHistoryCardList'
import Logo from '@/components/Logo'

function ModeratorLanding() {
  const navigate = useNavigate()

  const handleCreateActivityClick = () => {
    navigate('/moderator/create-activity')
  }

  return (
    <div className='flex flex-col gap-6 px-6'>
      <div className='mt-16 flex flex-row justify-between items-center'>
        <Logo />
        <div className='flex flex-col items-end justify-center gap-1'>
          <div className='label-medium px-2.5 rounded-xl bg-purple text-center text-white'>
            ID : 123
          </div>
          <p className='label-small'>Moderator คนที่ X</p>
        </div>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          <p className='headline-small-emphasized'>Menu</p>
          <button
            className='flex flex-col border rounded-2xl bg-yellow shadow-make-cartoonish p-4'
            onClick={handleCreateActivityClick}
          >
            <p className='title-medium-emphasized'>สร้าง Code รับ Coin</p>
            <p className='body-medium'>สำหรับน้องค่าย</p>
          </button>
        </div>
        <ActivityHistoryCardList />
      </div>
    </div>
  )
}

export default ModeratorLanding
