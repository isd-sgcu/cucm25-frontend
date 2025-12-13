import { Button } from '@/components/ui/button'
import { useUser } from '@/context/User'
import type { CoinHistory, GiftHistory } from '@/interface/transaction'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '@/components/Logo'
import { formatDateTime, formatEducation } from '@/utils/function'
import { getCoinsHistory, getGiftsHistory } from '@/api/transaction'

/**
 * Render a header with user information and a toggleable history view for coins and gifts.
 *
 * Displays user metadata in the header and a content area with two buttons to switch between
 * coin history and gift history. Each history list is shown sorted by timestamp (newest first)
 * and renders human-readable entries with timestamps and value indicators; when a list is empty,
 * a "No data provided" message is shown.
 *
 * @returns The component's JSX element containing the header and history UI.
 */
function JuniorSeniorHistory() {
  const { user } = useUser()
  const navigate = useNavigate()
  const [option, setOption] = useState<'เหรียญ' | 'ของขวัญ'>('เหรียญ')
  const [loading, setLoading] = useState(false)
  const [coinHistory, setCoinHistory] = useState<CoinHistory[]>([])
  const [giftHistory, setGiftHistory] = useState<GiftHistory[]>([])

  useEffect(() => {
    const fetchInformation = async () => {
      setLoading(true)
      try {
        const fetchedGifts = await getGiftsHistory()
        const fetchedCoins = await getCoinsHistory()
        console.log(fetchedGifts)
        console.log(fetchedCoins)
        setCoinHistory(fetchedCoins)
        setGiftHistory(fetchedGifts)
      } catch (error) {
        setCoinHistory([])
        setGiftHistory([])
      }
      setLoading(false)
    }

    fetchInformation()
  }, [])

  return (
    <div className='w-full h-fit min-h-screen bg-white flex flex-col'>
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

        {/* Page Name */}
        <div
          className='flex gap-1 items-center cursor-pointer'
          onClick={() => {
            navigate(-1)
          }}
        >
          <Icon icon='solar:alt-arrow-left-linear' className='w-6 h-6' />
          <h1 className='display-small truncate overflow-hidden whitespace-nowrap'>
            <span className='font-medium'>ประวัติ</span>
          </h1>
        </div>
      </div>

      {/* Content */}
      {!loading ? (
        <div className='w-full h-fit flex flex-col flex-1 px-4'>
          {/* Buttons */}
          <div className='grid grid-cols-[1fr_1fr] gap-2 w-full justify-center min-h-6 mb-6'>
            <Button
              variant={option != 'เหรียญ' ? 'outline' : 'default'}
              color={option != 'เหรียญ' ? 'black' : 'vivid-pink'}
              className={`w-auto h-fit rounded-full transition-colors duration-200 ${
                option == 'เหรียญ' && 'shadow-make-cartoonish-2'
              }`}
              onClick={() => {
                setOption('เหรียญ')
              }}
            >
              เหรียญ
            </Button>
            <Button
              variant={option != 'ของขวัญ' ? 'outline' : 'default'}
              color={option != 'ของขวัญ' ? 'black' : 'vivid-pink'}
              className={`w-auto h-fit rounded-full transition-colors duration-200 ${
                option == 'ของขวัญ' && 'shadow-make-cartoonish-2'
              }`}
              onClick={() => {
                setOption('ของขวัญ')
              }}
            >
              ของขวัญ
            </Button>
          </div>

          {/* History */}
          <div className='w-full flex flex-col gap-2'>
            {option == 'เหรียญ' ? (
              coinHistory.length > 0 ? (
                coinHistory
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map((history, idx) => {
                    let correspondantName = 'จ่ายให้กับบุคคลปริศนา'
                    let isIncreased = false
                    if (history.correspondentRole == 'ADMIN') {
                      if (history.action == 'sent') {
                        correspondantName = 'ถูกลดเหรียญโดยผู้ดูแล'
                        isIncreased = false
                      } else {
                        correspondantName = 'เพิ่มเหรียญโดยผู้ดูแล'
                        isIncreased = true
                      }
                    } else if (history.correspondentName == 'undefined undefined') {
                      correspondantName = 'จ่ายให้บัญชีกลางค่ายจุฬาเชียงใหม่'
                      isIncreased = false
                    } else if (history.correspondentName.startsWith('Redeemed from ')) {
                      const prefix = 'Redeemed from '
                      isIncreased = true
                      const eventName = history.correspondentName.slice(prefix.length)
                      correspondantName = `ได้รับจากกิจกรรม ${eventName}`
                    } else {
                      correspondantName = `ทำความรู้จักกับ ${history.correspondentName}`
                      isIncreased = true
                    }
                    return (
                      <div key={history.timestamp + idx}>
                        <div className='flex justify-between gap-2 items-center'>
                          <div className='flex flex-col gap-1'>
                            <p className='title-medium'>{correspondantName}</p>
                            <p className='label-small'>
                              {formatDateTime(new Date(history.timestamp).toISOString())}
                            </p>
                          </div>
                          <p
                            className={`${
                              isIncreased ? 'text-green' : 'text-red'
                            } title-medium text-end whitespace-nowrap`}
                          >
                            <span className='font-semibold'>
                              {isIncreased ? '+' : '-'} {history.amount}
                            </span>
                          </p>
                        </div>
                        <hr className='my-2 border text-[#E8E8E8]' />
                      </div>
                    )
                  })
              ) : (
                <p className='text-black text-center title-medium'>ไม่พบข้อมูล</p>
              )
            ) : giftHistory.length > 0 ? (
              giftHistory
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((history, idx) => {
                  return (
                    <div key={history.timestamp + idx}>
                      <div className='flex justify-between gap-2 items-center'>
                        <div className='flex flex-col gap-1'>
                          <p className='title-medium'>ส่งของขวัญให้ {history.recipientName}</p>
                          <p className='label-small'>
                            {formatDateTime(new Date(history.timestamp).toISOString())}
                          </p>
                        </div>
                        <p className='text-red title-medium text-end whitespace-nowrap'>
                          <span className='font-semibold'>-1 Gift</span>
                        </p>
                      </div>
                      <hr className='my-2 border text-[#E8E8E8]' />
                    </div>
                  )
                })
            ) : (
              <p className='text-black text-center title-medium'>ไม่พบข้อมูล</p>
            )}
          </div>
        </div>
      ) : (
        <div className='w-full h-fit flex flex-col flex-1 px-4'>
          <p className='title-medium'>Loading...</p>
        </div>
      )}
    </div>
  )
}

export default JuniorSeniorHistory