import PayingCoinPopup from '@/components/popup/PayingCoinPopup'
import RedeemPopup from '@/components/popup/RedeemPopup'
import SendingGiftPopup from '@/components/popup/SendingGiftPopup'
import RankBar from '@/components/Rankbar'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { IconBox } from '@/components/ui/icon-box'
import { useUser } from '@/context/User'
import type { LeaderboardUserInterface } from '@/interface/user'
import { type UserRoleType } from '@/utils/const'
import { Icon } from '@iconify/react'
import Logo from '@/components/Logo'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BuyingTicketPopup from '@/components/popup/BuyingTicketPopup'
import { formatEducation } from '@/utils/function'
import { useSystemStatus } from '@/context/SystemStatus'
import { getLeaderboardUser } from '@/api/leaderboard'

/**
 * Render the Junior/Senior landing page UI including user header, wallet actions, leaderboard, and popups.
 *
 * The component manages UI state (leaderboard filter, modal visibility, countdown to the next hour) and
 * performs two observable side effects: it updates the displayed leaderboard when the filter changes,
 * and when the countdown reaches zero it resets the user's `wallets.gift_sends_remaining` to the
 * system `giftHourlyQuota`.
 *
 * @returns The component's React element representing the landing page with controls for sending/receiving/paying coins, buying tickets, leaderboard filters, and associated popups.
 */
function JuniorSeniorLanding() {
  const { user, setUser } = useUser()
  const { giftHourlyQuota } = useSystemStatus()
  const navigate = useNavigate()
  const [leaderboardFilter, setLeaderboardFilter] = useState<'PARTICIPANT' | 'STAFF' | undefined>()
  const [filteredLeaderboardUsers, setFilteredLeaderboardUsers] = useState<
    LeaderboardUserInterface[]
  >([])

  const [openSendingGiftPopup, setOpenSendingGiftPopup] = useState(false)
  const [openRedeemPopup, setOpenRedeemPopup] = useState(false)
  const [openPayingCoinPopup, setOpenPayingCoinPopup] = useState(false)
  const [openBuyingTicketPopup, setOpenBuyingTicketPopup] = useState(false)
  const [minutesLeft, setMinutesLeft] = useState(getMinutesUntilNextHour())
  const [hasResetThisHour, setHasResetThisHour] = useState(false)

  function getMinutesUntilNextHour() {
    const now = new Date()

    const nowThai = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }))

    const nextThai = new Date(nowThai)
    nextThai.setHours(nowThai.getHours() + 1)
    nextThai.setMinutes(0)
    nextThai.setSeconds(0)
    nextThai.setMilliseconds(0)

    return Math.ceil((nextThai.getTime() - nowThai.getTime()) / 60000)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const minLeft = getMinutesUntilNextHour()
      setMinutesLeft(minLeft)

      if (minLeft === 0 && !hasResetThisHour) {
        setHasResetThisHour(true)
        setUser(prev =>
          prev
            ? {
                ...prev,
                wallets: {
                  ...prev.wallets,
                  gift_sends_remaining: giftHourlyQuota,
                },
              }
            : prev
        )
      } else if (minLeft > 0) {
        setHasResetThisHour(false)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [giftHourlyQuota, setUser, hasResetThisHour])

  const fetchLeaderboard = async (role: UserRoleType | undefined) => {
    try {
      const res = await getLeaderboardUser(role, 3)
      setFilteredLeaderboardUsers(res.leaderboard)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchLeaderboard(undefined)
  }, [])

  useEffect(() => {
    const role =
      leaderboardFilter === 'STAFF' || leaderboardFilter === 'PARTICIPANT'
        ? (leaderboardFilter as UserRoleType)
        : undefined

    fetchLeaderboard(role)
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
                    user?.role === 'PARTICIPANT'
                      ? 'bg-yellow text-black border-black'
                      : user?.role == 'STAFF'
                      ? 'bg-vivid-pink text-white border-black'
                      : ''
                  } rounded-full px-2 border shadow-make-cartoonish-1 mr-2`}
                >
                  {user?.username.toUpperCase()}
                </span>
                <span>
                  {user?.role === 'PARTICIPANT'
                    ? 'น้องค่าย'
                    : user?.role == 'STAFF'
                    ? 'พี่ค่าย'
                    : 'undefined'}
                </span>
              </p>
              <p className='label-medium text-end'>
                {user?.firstname} {user?.lastname}
              </p>
              <p className='label-medium text-end'>
                <span>{formatEducation(user?.educationLevel)} </span>
                <span>{user?.school}</span>
              </p>
            </div>
          </div>

          {/* Coin */}
          <div className='w-full flex items-center gap-4 pl-4'>
            <IconBox className='w-20 h-20' bgcolor='white'>
              <Icon icon='solar:star-fall-linear' className='w-14 h-14' />
            </IconBox>
            <div className='w-[50%] flex flex-col'>
              <p className='label-small'>เหรียญคงเหลือ</p>
              <p
                className='display-large text-white'
                style={{
                  textShadow: 'var(--shadow-make-cartoonish)',
                }}
              >
                {user?.wallets.coin_balance}
              </p>
              <hr className='w-full'></hr>
              <p className='label-large'>
                เหรียญสะสม{' '}
                <span className='font-semibold'>{user?.wallets.cumulative_coin} เหรียญ</span>
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
              className={`flex items-center gap-2 rounded-2xl p-2 w-full h-full flex-wrap ${
                !user?.wallets.gift_sends_remaining || user?.wallets.gift_sends_remaining <= 0
                  ? 'cursor-default'
                  : ''
              }`}
              color='white'
              cartoonish
              onClick={() => {
                if (user?.wallets.gift_sends_remaining && user?.wallets.gift_sends_remaining > 0) {
                  setOpenSendingGiftPopup(true)
                }
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
                  <span className='font-semibold'>
                    {Math.min(
                      user?.wallets.gift_sends_remaining
                        ? user?.wallets.gift_sends_remaining
                        : giftHourlyQuota,
                      giftHourlyQuota
                    )}
                    /{giftHourlyQuota}{' '}
                  </span>
                  <span className='label-small'>ครั้ง</span>
                </p>
                <p className='label-small'>รีเซตใน {minutesLeft} นาที</p>
              </div>
            </Button>

            {/* รับเหรียญ */}
            <Button
              variant='default'
              className='flex items-center gap-2 rounded-2xl p-2 w-full h-full flex-wrap'
              color='white'
              cartoonish
              onClick={() => {
                setOpenRedeemPopup(true)
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
                bgcolor='light-purple'
                size='sm'
                cartoonish={false}
                className='border shadow-make-cartoonish-1'
              >
                <Icon icon='solar:ticket-broken' className='w-5! h-5! -rotate-90' />
              </IconBox>
              <div className='flex flex-col items-start'>
                <p className='title-medium'>
                  <span className='font-semibold'>ซื้อ Ticket</span>
                </p>
              </div>
            </Button>
          </div>

          {/* Leaderboard */}
          <Container className='flex flex-1 flex-col gap-2 px-6 mb-6 max-h-fit'>
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
                variant={leaderboardFilter != 'STAFF' ? 'outline' : 'default'}
                color={leaderboardFilter != 'STAFF' ? 'black' : 'vivid-pink'}
                className={`w-auto h-fit rounded-full transition-colors duration-200 ${
                  leaderboardFilter == 'STAFF' && 'shadow-make-cartoonish-2'
                }`}
                onClick={() => {
                  if (leaderboardFilter === 'STAFF') {
                    setLeaderboardFilter(undefined)
                    return
                  }
                  setLeaderboardFilter('STAFF')
                }}
              >
                พี่ค่าย
              </Button>
              <Button
                variant={leaderboardFilter != 'PARTICIPANT' ? 'outline' : 'default'}
                color={leaderboardFilter != 'PARTICIPANT' ? 'black' : 'vivid-pink'}
                className={`w-auto h-fit rounded-full transition-colors duration-200 ${
                  leaderboardFilter == 'PARTICIPANT' && 'shadow-make-cartoonish-2'
                }`}
                onClick={() => {
                  if (leaderboardFilter === 'PARTICIPANT') {
                    setLeaderboardFilter(undefined)
                    return
                  }
                  setLeaderboardFilter('PARTICIPANT')
                }}
              >
                น้องค่าย
              </Button>
            </div>

            {/* Bars */}
            <div className='grid grid-cols-[1fr_1fr_1fr] gap-2 w-full justify-center'>
              {[0, 1, 2].map(idx =>
                filteredLeaderboardUsers[idx] ? (
                  <RankBar
                    key={idx}
                    rank={idx + 1}
                    nickname={filteredLeaderboardUsers[idx].nickname}
                    firstname={filteredLeaderboardUsers[idx].firstname}
                    lastname={filteredLeaderboardUsers[idx].lastname}
                    educationLevel={filteredLeaderboardUsers[idx].educationLevel}
                    cumulative_coin={filteredLeaderboardUsers[idx].cumulative_coin}
                  />
                ) : (
                  <RankBar key={idx} rank={idx + 1} />
                )
              )}
            </div>
          </Container>
        </div>
      </div>

      {openSendingGiftPopup && (
        <SendingGiftPopup setOpenSendingGiftPopup={setOpenSendingGiftPopup} />
      )}
      {openRedeemPopup && <RedeemPopup setOpenRedeemPopup={setOpenRedeemPopup} />}
      {openPayingCoinPopup && <PayingCoinPopup setOpenPayingCoinPopup={setOpenPayingCoinPopup} />}
      {openBuyingTicketPopup && (
        <BuyingTicketPopup
          openBuyingTicketPopup={openBuyingTicketPopup}
          setOpenBuyingTicketPopup={setOpenBuyingTicketPopup}
        />
      )}
    </>
  )
}

export default JuniorSeniorLanding
