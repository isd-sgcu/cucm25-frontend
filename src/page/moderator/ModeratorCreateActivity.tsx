'use client'

import { useState } from 'react'
import CreateActivityHeader from '@/components/moderator/CreateActivityHeader'
import CreateActivityForm from '@/components/moderator/CreateActivityForm'
import CreateActivityDisplay from '@/components/moderator/CreateActivityDisplay'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/th'
import dayjs, { Dayjs } from 'dayjs'

function ModeratorCreateActivity() {
  const now = dayjs()
  const [step, setStep] = useState(1)
  const [activityCode, setActivityCode] = useState('')
  const [activityName, setActivityName] = useState('')
  const [coinReward, setCoinReward] = useState(0)
  const [expiresDate, setExpiresDate] = useState<Dayjs>(now)
  const [expiresTime, setExpiresTime] = useState<Dayjs>(now)
  const [isActivityNameError, setIsActivityNameError] = useState(false)
  const [isCoinRewardError, setIsCoinRewardError] = useState(false)
  const [isExpiresError, setIsExpiresError] = useState(false)

  const limitCoin = 1000
  const campEndsAt = dayjs('2025-12-30T23:59:59')

  const handleCreateCodeClick = () => {
    // Validate first
    const nameError = !activityName
    const coinError = coinReward < 0 || coinReward > limitCoin
    const expiresError =
      !expiresDate ||
      !expiresTime ||
      expiresDate
        .add(expiresTime.hour(), 'hour')
        .add(expiresTime.minute(), 'minute')
        .isAfter(campEndsAt)

    // Set error states
    setIsActivityNameError(nameError)
    setIsCoinRewardError(coinError)
    setIsExpiresError(expiresError)

    // Early return if any validation fails
    if (nameError || coinError || expiresError) {
      return
    }

    // Simulate API call and response
    setActivityCode('ABCD1234')
    setStep(2)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='th'>
      <div className='flex flex-col gap-6'>
        <CreateActivityHeader />
        {step === 1 && (
          <CreateActivityForm
            limitCoin={limitCoin}
            activityName={activityName}
            setActivityName={setActivityName}
            coinReward={coinReward}
            setCoinReward={setCoinReward}
            expiresDate={expiresDate}
            setExpiresDate={setExpiresDate}
            expiresTime={expiresTime}
            setExpiresTime={setExpiresTime}
            isActivityNameError={isActivityNameError}
            setIsActivityNameError={setIsActivityNameError}
            isCoinRewardError={isCoinRewardError}
            setIsCoinRewardError={setIsCoinRewardError}
            isExpiresError={isExpiresError}
            setIsExpiresError={setIsExpiresError}
            handleSubmit={handleCreateCodeClick}
          />
        )}
        {step === 2 && (
          <CreateActivityDisplay
            activityCode={activityCode}
            activityName={activityName}
            coinReward={coinReward}
            expiresAt={
              expiresDate && expiresTime
                ? expiresDate
                    .add(expiresTime.hour(), 'hour')
                    .add(expiresTime.minute(), 'minute')
                    .format('DD/MM/YYYY HH:mm')
                : ''
            }
          />
        )}
      </div>
    </LocalizationProvider>
  )
}

export default ModeratorCreateActivity
