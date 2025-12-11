import { useState } from 'react'
import CreateActivityHeader from '@/components/CreateActivity/CreateActivityHeader'
import CreateActivityForm from '@/components/CreateActivity/CreateActivityForm'
import CreateActivityDisplay from '@/components/CreateActivity/CreateActivityDisplay'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/th'
import dayjs, { Dayjs } from 'dayjs'
import { useUser } from '@/context/User'
import { useNavigate } from 'react-router-dom'
import { generateActivityCode } from '@/api/code'
import { useSearchParams } from 'react-router-dom'

function SuperAdminCreateActivity() {
  const now = dayjs()
  const { user } = useUser()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [activityCode, setActivityCode] = useState<string>('')
  const [activityName, setActivityName] = useState<string>('')
  const [coinReward, setCoinReward] = useState<number>(0)
  const [expiresAt, setExpiresAt] = useState<string>('')
  const [expiresDate, setExpiresDate] = useState<Dayjs>(now)
  const [expiresTime, setExpiresTime] = useState<Dayjs>(now)
  const [isActivityNameError, setIsActivityNameError] = useState(false)
  const [isCoinRewardError, setIsCoinRewardError] = useState(false)
  const [isExpiresError, setIsExpiresError] = useState(false)

  const limitCoin = 1000
  const campEndsAt = dayjs('2025-12-30T23:59:59')
  const [searchParams] = useSearchParams()
  const role = searchParams.get('role') || 'junior'

  if (!user) {
    navigate('/auth/login')
    return null
  }

  const handleCreateCodeClick = async () => {
    // Validate first
    const nameError = !activityName
    const coinError = coinReward <= 0 || coinReward > limitCoin
    const calculatedExpiresAt = expiresDate
      .hour(expiresTime.hour())
      .minute(expiresTime.minute())
      .second(0)
      .millisecond(0)
    const expiresError =
      !expiresDate ||
      !expiresTime ||
      calculatedExpiresAt.isAfter(campEndsAt)

    // Set error states
    setIsActivityNameError(nameError)
    setIsCoinRewardError(coinError)
    setIsExpiresError(expiresError)

    // Early return if any validation fails
    if (nameError || coinError || expiresError) {
      return
    }

    // Simulate API call and response
    const data = await generateActivityCode({
      targetRole: role,
      activityName: activityName,
      rewardCoin: coinReward,
      expiresAt: expiresDate
        .add(expiresTime.hour(), 'hour')
        .add(expiresTime.minute(), 'minute')
        .toISOString(),
    })

    setActivityCode(data.codeString)
    setActivityName(data.activityName)
    setCoinReward(data.rewardCoin)
    setExpiresAt(calculatedExpiresAt.toISOString())
    setStep(2)
  }

  const handleReset = () => {
    setActivityCode('')
    setActivityName('')
    setCoinReward(0)
    setExpiresDate(now)
    setExpiresTime(now)
    setStep(1)
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
            expiresAt={expiresAt}
            handleReset={handleReset}
          />
        )}
      </div>
    </LocalizationProvider>
  )
}

export default SuperAdminCreateActivity
