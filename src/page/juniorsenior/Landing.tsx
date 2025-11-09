import PayingCoinPopup from '@/components/popup/PayingCoinPopup'
import ReceivingCoinPopup from '@/components/popup/ReceivingCoinPopup'
import SendingGiftPopup from '@/components/popup/SendingGiftPopup'
import RankBar from '@/components/Rankbar'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { IconBox } from '@/components/ui/icon-box'
import { useUser } from '@/context/User'
import type { LeaderboardUser } from '@/interface/user'
import { mockLeaderboardUsers } from '@/utils/const'
import { Icon } from '@iconify/react'
import Logo from '@/components/Logo'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BuyingTicketPopup from '@/components/popup/BuyingTicketPopup'

function JuniorSeniorLanding() {
  const { user } = useUser()
  const navigate = useNavigate()
  const [leaderboardFilter, setLeaderboardFilter] = useState<'junior' | 'senior' | undefined>()
  const [filteredLeaderboardUsers, setFilteredLeaderboardUsers] = useState<LeaderboardUser[]>([])

  const [openSendingGiftPopup, setOpenSendingGiftPopup] = useState(false)
  const [openReceivingCoinPopup, setOpenReceivingCoinPopup] = useState(false)
  const [openPayingCoinPopup, setOpenPayingCoinPopup] = useState(false)
  const [openBuyingTicketPopup, setOpenBuyingTicketPopup] = useState(false)

  // Leaderboard Filter
  useEffect(() => {
    if (!leaderboardFilter) {
      setFilteredLeaderboardUsers(mockLeaderboardUsers)
      return
    }

    const filteredUsers = mockLeaderboardUsers.filter(u => u.role === leaderboardFilter)
    setFilteredLeaderboardUsers(filteredUsers)
  }, [leaderboardFilter])

  return (
    <>
      <div className='w-full h-fit min-h-screen bg-light-yellow flex flex-col'>
        {/* Header */}
        <div className='w-full h-fit flex flex-col gap-6 bg-pink border rounded-b-xl shadow-make-cartoonish mb-6 px-2 py-4'>
          {/* User Information */}
          <div className='flex gap-4 justify-between items-center'>
            <Logo />
            <div className='flex flex-col items-end flex-wrap gap-0.5'>
              <p className='label-medium text-end flex items-center'>
                <span
                  className={`${
                    user.role === 'junior'
                      ? 'bg-yellow text-black border-black'
                      : user.role == 'senior'
                      ? 'bg-vivid-pink text-white border-black'
                      : ''
                  } rounded-full px-2 border shadow-make-cartoonish-1 mr-2`}
                >
                  {user.username}
                </span>
                <span>
                  {user.role === 'junior'
                    ? 'น้องค่าย'
                    : user.role == 'senior'
                    ? 'พี่ค่าย'
                    : 'undefined'}
                </span>
              </p>
              <p className='label-medium text-end'>
                {user.firstname} {user.lastname}
              </p>
              <p className='label-medium text-end'>
                <span>
                  {user.education_level == 'มหาลัย' ? 'ปี ' : 'ม.'}
                  {user.year}{' '}
                </span>
                <span>{user.school}</span>
              </p>
            </div>
          </div>

          {/* Point */}
          <div className='w-fit flex items-center justify-center gap-4 self-center'>
            <IconBox className='w-20 h-20' bgcolor='white'>
              <Icon icon='solar:star-fall-linear' className='w-14 h-14' />
            </IconBox>
            <div className='flex flex-col'>
              <p className='label-small'>เหรียญคงเหลือ</p>
              <p
                className='display-large text-white'
                style={{
                  textShadow: 'var(--shadow-make-cartoonish)',
                }}
              >
                {user.points}
              </p>
              <hr className='w-full'></hr>
              <p className='label-large'>
                เหรียญสะสม <span className='font-semibold'>{user.cumulative_points} เหรียญ</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='w-full h-fit bg-light-yellow flex flex-col flex-1 px-4'>
          {/* Buttons */}
          <div className='grid grid-cols-[1.3fr_1.1fr] gap-4 mb-8 w-full'>
            {/* ส่งของขวัญ */}
            <Button
              variant='default'
              className='flex items-center gap-2 rounded-2xl p-2 w-full h-full flex-wrap'
              color='white'
              cartoonish
              onClick={() => {
                setOpenSendingGiftPopup(true)
              }}
            >
              <IconBox
                bgcolor='light-blue'
                cartoonish={false}
                className='w-14 h-14 border shadow-make-cartoonish-2'
              >
                <Icon icon='solar:gift-linear' className='w-9! h-9!' />
              </IconBox>
              <div className='flex flex-col items-start'>
                <p className='title-medium'>
                  <span className='font-semibold'>ส่งของขวัญ</span>
                </p>
                <p className='label-small'>เหลืออีก</p>
                <p className='title-large'>
                  <span className='font-semibold'>4/7</span>
                  <span className='label-small'>ครั้ง</span>
                </p>
                <p className='label-small'>รีเซตใน 42 นาที</p>
              </div>
            </Button>

            {/* รับเหรียญ */}
            <Button
              variant='default'
              className='flex items-center gap-2 rounded-2xl p-2 w-full h-full flex-wrap'
              color='white'
              cartoonish
              onClick={() => {
                setOpenReceivingCoinPopup(true)
              }}
            >
              <IconBox
                bgcolor='pink'
                cartoonish={false}
                className='w-14 h-14 border shadow-make-cartoonish-2'
              >
                <Icon icon='solar:star-outline' className='w-9! h-9!' />
              </IconBox>
              <div className='flex flex-col items-start'>
                <p className='title-medium'>
                  <span className='font-semibold'>รับ</span>
                </p>
                <p className='title-medium'>
                  <span className='font-semibold'>เหรียญ</span>
                </p>
              </div>
            </Button>

            {/* จ่าย */}
            <Button
              variant='default'
              className='flex items-center gap-2 rounded-2xl p-2 w-full h-full flex-wrap'
              color='white'
              cartoonish
              onClick={() => {
                setOpenPayingCoinPopup(true)
              }}
            >
              <IconBox
                bgcolor='yellow'
                size='sm'
                cartoonish={false}
                className='border shadow-make-cartoonish-1'
              >
                <Icon icon='solar:star-circle-outline' className='w-5! h-5!' />
              </IconBox>
              <div className='flex flex-col items-start'>
                <p className='title-medium'>
                  <span className='font-semibold'>จ่าย</span>
                </p>
              </div>
            </Button>

            {/* ประวัติ */}
            <Button
              variant='default'
              className='flex items-center gap-2 rounded-2xl p-2 w-full h-full flex-wrap'
              color='white'
              cartoonish
              onClick={() => {
                navigate(`/history`)
              }}
            >
              <IconBox bgcolor='white' size='sm' cartoonish={false}>
                <Icon icon='solar:clock-circle-outline' className='w-5! h-5!' />
              </IconBox>
              <div className='flex flex-col items-start'>
                <p className='title-medium'>
                  <span className='font-semibold'>ประวัติ</span>
                </p>
              </div>
            </Button>

            {/* ซื้อ Ticket */}
            <Button
              variant='default'
              className='flex items-center gap-2 rounded-2xl p-2 w-full h-full flex-wrap col-span-2'
              color='white'
              cartoonish
              onClick={() => {
                setOpenBuyingTicketPopup(true)
              }}
            >
              <IconBox
                bgcolor='purple'
                size='sm'
                cartoonish={false}
                className='border shadow-make-cartoonish-1'
              >
                <Icon icon='solar:ticket-broken' className='w-5! h-5!' />
              </IconBox>
              <div className='flex flex-col items-start'>
                <p className='title-medium'>
                  <span className='font-semibold'>ซื้อ Ticket</span>
                </p>
              </div>
            </Button>
          </div>

          {/* Leaderboard */}
          <Container className='flex flex-1 flex-col gap-2 px-6 mb-6'>
            {/* Header */}
            <div
              className='flex justify-between items-center gap-2 cursor-pointer'
              onClick={() => {
                if (!leaderboardFilter) {
                  navigate(`/leaderboard`)
                } else {
                  navigate(`/leaderboard?role=${leaderboardFilter}`)
                }
              }}
            >
              <div className='flex gap-1 w-full items-center'>
                <Icon icon='solar:ranking-linear' className='w-8 h-8' />
                <p className='headline-small truncate overflow-hidden whitespace-nowrap'>
                  Leaderboard
                </p>
              </div>
              <Icon icon='solar:alt-arrow-right-linear' className='w-6 h-6' />
            </div>

            {/* Buttons */}
            <div className='grid grid-cols-[1fr_1fr] gap-2 w-full justify-center min-h-6'>
              <Button
                variant={leaderboardFilter != 'senior' ? 'outline' : 'default'}
                color={leaderboardFilter != 'senior' ? 'black' : 'vivid-pink'}
                className={`w-auto h-fit rounded-full transition-colors duration-200 ${
                  leaderboardFilter == 'senior' && 'shadow-make-cartoonish-2'
                }`}
                onClick={() => {
                  setLeaderboardFilter('senior')
                }}
              >
                พี่ค่าย
              </Button>
              <Button
                variant={leaderboardFilter != 'junior' ? 'outline' : 'default'}
                color={leaderboardFilter != 'junior' ? 'black' : 'vivid-pink'}
                className={`w-auto h-fit rounded-full transition-colors duration-200 ${
                  leaderboardFilter == 'junior' && 'shadow-make-cartoonish-2'
                }`}
                onClick={() => {
                  setLeaderboardFilter('junior')
                }}
              >
                น้องค่าย
              </Button>
            </div>

            {/* Bars */}
            {filteredLeaderboardUsers.slice(0, 3).length > 0 ? (
              <div className='grid grid-cols-[1fr_1fr_1fr] gap-2 w-full justify-center'>
                {filteredLeaderboardUsers.map((u, idx) => {
                  return (
                    <RankBar
                      key={idx}
                      rank={idx + 1}
                      nickname={u.nickname}
                      role={u.role}
                      fullname={u.fullname}
                      year={u.year}
                      points={u.cumulative_points}
                    />
                  )
                })}
              </div>
            ) : (
              <p className='text-black text-center title-medium'>No data provided</p>
            )}
          </Container>
        </div>
      </div>

      {openSendingGiftPopup && (
        <SendingGiftPopup setOpenSendingGiftPopup={setOpenSendingGiftPopup} />
      )}

      {openReceivingCoinPopup && (
        <ReceivingCoinPopup setOpenReceivingCoinPopup={setOpenReceivingCoinPopup} />
      )}

      {openPayingCoinPopup && <PayingCoinPopup setOpenPayingCoinPopup={setOpenPayingCoinPopup} />}
      {openBuyingTicketPopup && (
        <BuyingTicketPopup setOpenBuyingTicketPopup={setOpenBuyingTicketPopup} />
      )}
    </>
  )
}

export default JuniorSeniorLanding
