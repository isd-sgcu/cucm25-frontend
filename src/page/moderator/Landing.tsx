import { useNavigate } from 'react-router-dom'
import ActivityHistoryCardList from '@/components/ActivityHistoryCardList'
import Logo from '@/components/Logo'
import { useUser } from '@/context/User'
import { useState } from 'react'
import LogoutPopup from '@/components/popup/LogoutPopup'

function ModeratorLanding() {
  const navigate = useNavigate()
  const { user } = useUser()

  const [openLogoutPopup, setOpenLogoutPopup] = useState(false)

  if (!user) {
    return null
  }

  const handleCreateActivityClick = () => {
    navigate('/moderator/create-activity')
  }

  return (
    <>
      <div className='flex flex-col gap-6 px-6'>
        <div className='mt-8 flex flex-row justify-between items-center'>
          <Logo />
          <div
            className='flex flex-col items-end justify-center gap-1 cursor-pointer'
            onClick={() => {
              setOpenLogoutPopup(true)
            }}
          >
            <div className='label-medium px-2.5 rounded-xl bg-purple text-center text-white'>
              {user.username}
            </div>
            <div className='text-right'>
              <p className='label-small'>
                {user.firstname + ' ' + user.lastname + ' (' + user.nickname + ')'}
              </p>
            </div>
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
      {openLogoutPopup && <LogoutPopup setOpenLogoutPopup={setOpenLogoutPopup} />}
    </>
  )
}

export default ModeratorLanding
