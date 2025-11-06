import { Button } from '@/components/ui/button'
import { useUser } from '@/context/User'
import type { CoinHistory, GiftHistory } from '@/interface/transaction'
import { mockCoinHistory, mockGiftHistory } from '@/utils/const'
import { convertDateToDateString } from '@/utils/function'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '@/components/Logo'

function JuniorSeniorHistory() {
  const { user } = useUser()
  const navigate = useNavigate()
  const [option, setOption] = useState<'เหรียญ' | 'ของขวัญ'>('เหรียญ')
  const [coinHistory, setCoinHistory] = useState<CoinHistory[]>([])
  const [giftHistory, setGiftHistory] = useState<GiftHistory[]>([])

  useEffect(() => {
    setCoinHistory(mockCoinHistory)
    setGiftHistory(mockGiftHistory)
  })

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
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .map(h => {
                  return (
                    <div key={h.id}>
                      <div className='flex justify-between gap-2 items-center'>
                        <div className='flex flex-col gap-1'>
                          <p className='title-medium'>
                            {h.type == 'person'
                              ? 'ทำความรู้จักกับ'
                              : h.type == 'event'
                                ? 'เข้าร่วม'
                                : 'จ่ายให้'}{' '}
                            {h.name}
                          </p>
                          <p className='label-small'>{convertDateToDateString(h.timestamp)}</p>
                        </div>
                        <p
                          className={`${
                            h.type == 'account' ? 'text-red' : 'text-green'
                          } title-medium text-end whitespace-nowrap`}
                        >
                          <span className='font-semibold'>
                            {h.type == 'account' ? '-' : '+'} {h.coins}
                          </span>
                        </p>
                      </div>
                      <hr className='my-2 border text-[#E8E8E8]' />
                    </div>
                  )
                })
            ) : (
              <p className='text-black text-center title-medium'>No data provided</p>
            )
          ) : giftHistory.length > 0 ? (
            giftHistory
              .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
              .map(h => {
                return (
                  <div key={h.id}>
                    <div className='flex justify-between gap-2 items-center'>
                      <div className='flex flex-col gap-1'>
                        <p className='title-medium'>ส่งของขวัญให้ {h.name}</p>
                        <p className='label-small'>{convertDateToDateString(h.timestamp)}</p>
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
            <p className='text-black text-center title-medium'>No data provided</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default JuniorSeniorHistory
