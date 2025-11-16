import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import type { Dayjs } from 'dayjs'
import { useState, useEffect } from 'react'

interface ExportTicketFormProps {
  data: {
    startDate: Dayjs
    startTime: Dayjs
    endDate: Dayjs
    endTime: Dayjs
  }
  setData: (data: { startDate: Dayjs; startTime: Dayjs; endDate: Dayjs; endTime: Dayjs }) => void
}

export default function ExportTicketForm({ data, setData }: ExportTicketFormProps) {
  const navigate = useNavigate()
  const [isStartDateTimeError, setIsStartDateTimeError] = useState(false)
  const [isEndDateTimeError, setIsEndDateTimeError] = useState(false)
  const [startDateTimeErrorMessage, setStartDateTimeErrorMessage] = useState('')
  const [endDateTimeErrorMessage, setEndDateTimeErrorMessage] = useState('')

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSubmit = () => {
    setIsStartDateTimeError(false)
    setStartDateTimeErrorMessage('')
    setIsEndDateTimeError(false)
    setEndDateTimeErrorMessage('')

    let isError = false

    if (!data.startDate || !data.startTime) {
      isError = true
      setIsStartDateTimeError(true)
      setStartDateTimeErrorMessage('*กรุณาเลือกวันและเวลาที่ต้องการ')
    }
    // Validate end date/time
    if (!data.endDate || !data.endTime) {
      isError = true
      setIsEndDateTimeError(true)
      setEndDateTimeErrorMessage('*กรุณาเลือกวันและเวลาที่ต้องการ')
    }

    if (!isError) {
      const startDateTime = data.startDate
        .hour(data.startTime.hour())
        .minute(data.startTime.minute())
        .second(0)
        .millisecond(0)
      const endDateTime = data.endDate
        .hour(data.endTime.hour())
        .minute(data.endTime.minute())
        .second(0)
        .millisecond(0)

      if (endDateTime.isBefore(startDateTime)) {
        setIsEndDateTimeError(true)
        setEndDateTimeErrorMessage('*วันและเวลาสิ้นสุดต้องไม่อยู่ก่อนวันและเวลาเริ่มต้น')
        return
      }

      console.log('Exporting tickets from', startDateTime.toString(), 'to', endDateTime.toString())
      // Proceed with export logic here
    }
  }

  useEffect(() => {
    if (data.startDate && data.startTime) {
      setIsStartDateTimeError(false)
    }
    if (data.endDate && data.endTime) {
      setIsEndDateTimeError(false)
    }
  }, [data.startDate, data.startTime, data.endDate, data.endTime])

  return (
    <div className='flex flex-col gap-10 px-6'>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-2 relative'>
          <label htmlFor='expires' className='title-medium-emphasized'>
            เลือกช่วงเริ่มต้น
          </label>
          <div className='flex flex-row gap-4'>
            <DatePicker
              sx={{ width: '66.67%' }}
              value={data.startDate}
              onChange={newValue => {
                if (newValue) {
                  setData({
                    ...data,
                    startDate: newValue,
                  })
                }
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  InputProps: {
                    className:
                      'min-w-0 title-small rounded-xl! bg-grey px-3 py-1 outline-none! text-black shadow-make-cartoonish disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-deep-deep-grey border border-black!',
                  },
                },
              }}
            />
            <TimePicker
              sx={{ width: '33.33%' }}
              value={data.startTime}
              onChange={newValue => {
                if (newValue) {
                  setData({
                    ...data,
                    startTime: newValue,
                  })
                }
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  InputProps: {
                    className:
                      'min-w-0 title-small rounded-xl! bg-grey px-3 py-1 outline-none! text-black shadow-make-cartoonish disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-deep-deep-grey border border-black!',
                  },
                },
              }}
            />
          </div>
          {isStartDateTimeError && (
            <p className='body-small text-red absolute top-full mt-2.5 text-center w-full'>
              {startDateTimeErrorMessage}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2 relative'>
          <label htmlFor='expires' className='title-medium-emphasized'>
            เลือกช่วงสิ้นสุด
          </label>
          <div className='flex flex-row gap-4'>
            <DatePicker
              sx={{ width: '66.67%' }}
              value={data.endDate}
              onChange={newValue => {
                if (newValue) {
                  setData({
                    ...data,
                    endDate: newValue,
                  })
                }
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  InputProps: {
                    className:
                      'min-w-0 title-small rounded-xl! bg-grey px-3 py-1 outline-none! text-black shadow-make-cartoonish disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-deep-deep-grey border border-black!',
                  },
                },
              }}
            />
            <TimePicker
              sx={{ width: '33.33%' }}
              value={data.endTime}
              onChange={newValue => {
                if (newValue) {
                  setData({
                    ...data,
                    endTime: newValue,
                  })
                }
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  InputProps: {
                    className:
                      'min-w-0 title-small rounded-xl! bg-grey px-3 py-1 outline-none! text-black shadow-make-cartoonish disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-deep-deep-grey border border-black!',
                  },
                },
              }}
            />
          </div>
          {isEndDateTimeError && (
            <p className='body-small text-red absolute top-full mt-2.5 text-center w-full'>
              {endDateTimeErrorMessage}
            </p>
          )}
        </div>
      </div>
      <div className='flex flex-row justify-center items-center gap-4 w-full flex-wrap'>
        <Button
          className='flex flex-row items-center gap-2 rounded-full px-4 py-2.5 w-fit border border-purple'
          size={'custom'}
          variant={'outline'}
          color={'purple'}
          onClick={handleBackClick}
        >
          <ArrowLeft size={16} />
          ย้อนกลับ
        </Button>
        <Button
          className='flex flex-row items-center gap-2 rounded-full px-5 py-2.5 w-fit shadow-elevation-1'
          size={'custom'}
          disabled={Object.values(data).some(d => d == null)}
          onClick={handleSubmit}
        >
          Export (.csv)
        </Button>
      </div>
    </div>
  )
}
