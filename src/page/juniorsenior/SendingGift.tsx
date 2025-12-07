import { Button } from '@/components/ui/button'
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useUser } from '@/context/User'
import {
  ACADEMIC_YEARS as ACADEMIC_YEAR_OPTIONS,
  participantQuestions,
  SECONDARY_YEARS as SECONDARY_YEAR_OPTIONS,
  seniorQuestions,
} from '@/utils/const'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Logo from '@/components/Logo'
import { formatDateTime, formatEducation } from '@/utils/function'
import type { AnswerInterface } from '@/interface/question'

interface JuniorSeniorSendingGiftFormProps {
  id: string
  nickname: string
  educationLevel: 'M' | 'Y' | undefined
  year: '1' | '2' | '3' | '4' | '5' | '6' | 'บัณฑิต' | undefined
  question_answers: AnswerInterface[]
}

function JuniorSeniorSendingGift() {
  const { user } = useUser()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const targetRole = searchParams.get('role')
  const targetId = searchParams.get('id')

  const [isValidForm, setValidForm] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [openResultPopup, setOpenResultPopup] = useState(false)
  const [timestamp, setTimestamp] = useState<string | null>(null)

  const [formData, setFormData] = useState<JuniorSeniorSendingGiftFormProps | null>(null)

  if (!targetId || !targetRole) {
    navigate(-1)
    return null
  }

  const YEAR_OPTIONS = targetRole === 'PARTICIPANT' ? SECONDARY_YEAR_OPTIONS : ACADEMIC_YEAR_OPTIONS
  const QUESTIONS = targetRole === 'PARTICIPANT' ? participantQuestions : seniorQuestions

  useEffect(() => {
    if (!formData) {
      setFormData({
        id: targetId,
        nickname: '',
        educationLevel: targetRole === 'PARTICIPANT' ? 'M' : 'Y',
        year: targetRole === 'PARTICIPANT' ? '4' : '1',
        question_answers: [],
      })
    }
  }, [formData, targetId, targetRole])

  useEffect(() => {
    if (!formData) return

    const totalQuestions = QUESTIONS.length
    const answers = formData.question_answers

    const allAnswered =
      answers.length === totalQuestions &&
      answers.every(ans => ans.optionText && ans.optionText.trim() !== '')

    setValidForm(formData.nickname.trim() !== '' && formData.year !== undefined && allAnswered)
  }, [formData, QUESTIONS])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true)
    e.preventDefault()

    // Replace with Real API
    const randomNum = Math.random()
    setSuccess(randomNum >= 0.5)

    const now = new Date()
    setTimestamp(formatDateTime(now.toISOString()))
    setLoading(false)
  }

  const formatEducationInPopup = (formData: JuniorSeniorSendingGiftFormProps | null) => {
    if (!formData) return undefined
    if (formData.year === 'บัณฑิต') return 'บัณฑิต'

    if (formData.educationLevel === 'M') return `ม.${formData.year}`
    return `ปี ${formData.year}`
  }

  return (
    <div className='w-full h-fit min-h-screen bg-white flex flex-col'>
      {/* Header */}
      <div className='w-full h-fit flex flex-col gap-6 bg-light-blue border rounded-b-xl shadow-make-cartoonish mb-6 px-2 py-4'>
        {/* User Information */}
        <div className='flex gap-4 justify-between items-center'>
          <Logo />
          <div className='flex flex-col items-end flex-wrap'>
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
                {user?.username}
              </span>
              <span>
                {user?.role === 'PARTICIPANT'
                  ? 'น้องค่าย'
                  : user?.role == 'STAFF'
                  ? 'พี่ค่าย'
                  : undefined}
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
            if (!isLoading) navigate(-1)
          }}
        >
          <Icon icon='solar:alt-arrow-left-linear' className='w-6 h-6' />
          <div className='flex flex-col gap-1'>
            <h1 className='display-small whitespace-normal wrap-break-word'>
              <span className='font-medium'>คำถามพิสูจน์มิตรภาพ</span>
            </h1>
            <h2 className='label-large whitespace-normal wrap-break-word'>
              ตอบให้ถูกทั้งหมดเพื่อส่งของขวัญให้สำเร็จ
            </h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='w-full flex bg-white flex-col px-4'>
        {/* Target */}
        <div className='flex justify-between gap-2'>
          <h2 className='title-medium'>
            <span className='font-semibold'>ส่งของขวัญให้</span>
          </h2>
          <div className='flex flex-col items-end gap-0.5'>
            <span
              className={`${
                targetRole === 'PARTICIPANT'
                  ? 'bg-yellow text-black border-black'
                  : targetRole == 'STAFF'
                  ? 'bg-vivid-pink text-white border-black'
                  : ''
              } w-fit rounded-full px-2 border shadow-make-cartoonish-1 text-right`}
            >
              ID: {targetId}
            </span>
            <p className='title-small text-right'>{`ธิดาพร ชาวคูเวียง (${
              targetRole == 'PARTICIPANT'
                ? 'น้องค่าย'
                : targetRole == 'STAFF'
                ? 'พี่ค่าย'
                : undefined
            })`}</p>
            <p className='title-small text-right'>โรงเรียนเชียงใหม่ในดวงใจ</p>
          </div>
        </div>
        <hr className='my-4 border rounded-full' />
        <form
          onSubmit={handleSubmit}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
            }
          }}
          className='w-full flex flex-col gap-4 mb-6'
        >
          {/* Nickname */}
          <Input
            disabled={isLoading}
            placeholder='กรอกชื่อเล่นเป็นภาษาไทย'
            label='ชื่อเล่น'
            value={formData?.nickname}
            onChange={e => {
              e.preventDefault()
              const value = e.target.value
              const thaiOnly = value.replace(/[^ก-๙\s]/g, '')
              setFormData(prev => (prev ? { ...prev, nickname: thaiOnly } : prev))
            }}
          />

          {/* Education Level */}
          <div className='flex min-w-full items-end gap-2'>
            <Input
              disabled={isLoading}
              placeholder='กรอกชื่อเล่นเป็นภาษาไทย'
              label='ระดับการศึกษา'
              value={targetRole == 'PARTICIPANT' ? 'มัธยม' : targetRole == 'STAFF' ? 'มหาลัย' : ''}
              readOnly
            />

            <div className='w-fit flex flex-col gap-1'>
              <label className='label-large'>
                <span className='font-semibold'>ชั้นปีที่</span>
              </label>
              <DropdownMenu size='md' color='light-blue'>
                <DropdownMenuTrigger>{formData?.year}</DropdownMenuTrigger>

                <DropdownMenuContent align='end'>
                  <DropdownMenuGroup>
                    {YEAR_OPTIONS.map(year => (
                      <DropdownMenuItem
                        disabled={isLoading}
                        key={year}
                        onClick={() =>
                          setFormData(prev =>
                            prev
                              ? {
                                  ...prev,
                                  year: year as '1' | '2' | '3' | '4' | '5' | '6' | 'บัณฑิต',
                                }
                              : prev
                          )
                        }
                      >
                        {year}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Questions */}
          <div className='flex flex-col gap-4'>
            {QUESTIONS.map(question => {
              const currentAnswer = formData?.question_answers.find(
                a => a.questionId === question.id
              )?.optionText

              return (
                <div key={question.id} className='flex flex-col gap-2'>
                  <label className='label-large font-semibold'>{question.title}</label>

                  <DropdownMenu color='light-blue'>
                    <DropdownMenuTrigger>{currentAnswer || 'กรุณาเลือกคำตอบ'}</DropdownMenuTrigger>

                    <DropdownMenuContent
                      align='end'
                      side='bottom'
                      sideOffset={4}
                      avoidCollisions={true}
                      collisionPadding={8}
                    >
                      <DropdownMenuGroup>
                        {question.answers.map(answer => (
                          <DropdownMenuItem
                            disabled={isLoading}
                            key={answer}
                            onClick={() =>
                              setFormData(prev =>
                                prev
                                  ? {
                                      ...prev,
                                      question_answers: [
                                        ...prev.question_answers.filter(
                                          a => a.questionId !== question.id
                                        ),
                                        { questionId: question.id, optionText: answer },
                                      ],
                                    }
                                  : prev
                              )
                            }
                          >
                            {answer}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )
            })}
          </div>

          {/* Button */}
          <Button
            disabled={!isValidForm || isLoading}
            onClick={() => {
              setOpenResultPopup(true)
            }}
          >
            {isLoading ? 'กำลังส่งคำตอบ...' : 'ยืนยันคำตอบ'}
          </Button>
        </form>
      </div>

      {openResultPopup && (
        <>
          {/* Overlay */}
          <div className='fixed inset-0 bg-black/70 backdrop-blur-sm z-40'></div>

          {/* Modal */}
          <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='max-w-md w-[80%] flex flex-col gap-8 items-center bg-white rounded-2xl'>
              {/* Header */}
              <div
                className={`w-full flex flex-col items-center p-6 gap-2 rounded-t-2xl ${
                  isSuccess ? 'bg-green' : 'bg-red'
                }`}
              >
                <Icon
                  icon={isSuccess ? 'solar:star-shine-outline' : 'solar:star-rings-linear'}
                  color='white'
                  className='w-14 h-14'
                />
                <p className='title-large text-white text-center'>
                  {isSuccess ? 'ส่งของขวัญสำเร็จ' : 'ส่งของขวัญไม่สำเร็จ'}
                </p>
              </div>

              {/* Content */}
              <div className='w-full flex flex-col items-center px-6'>
                {!isSuccess ? (
                  <>
                    <p className='title-large mb-2 text-center'>
                      <span className='font-semibold'>ตอบคำถามไม่ถูกต้อง</span>
                    </p>
                    <p className='title-small text-center'>
                      ลองคุยแล้วถามใหม่เพื่อให้ได้คำตอบที่ถูกต้อง
                    </p>
                  </>
                ) : (
                  <>
                    <p className='label-medium mb-1 text-center'>ให้กับ</p>
                    <p className='title-large mb-2 bg-purple text-center text-white rounded-full w-fit px-3 py-1'>
                      <span className='font-semibold'>ID: {targetId}</span>
                    </p>
                    <p className='title-large mb-1 text-center'>
                      <span className='font-semibold'>
                        {formData?.nickname} {formatEducationInPopup(formData)}
                      </span>
                    </p>
                    <p className='title-medium mb-1 text-center'>
                      <span className='font-semibold'>
                        {targetRole === 'PARTICIPANT'
                          ? 'น้องค่าย'
                          : targetRole === 'STAFF'
                          ? 'พี่ค่าย'
                          : undefined}
                      </span>
                    </p>
                    <p className='label-medium text-center'>ส่งแล้วเมื่อ {timestamp}</p>
                  </>
                )}
              </div>

              {/* Buttons */}
              <div className='w-full flex justify-center items-center gap-2 flex-wrap pb-6 px-6'>
                <Button
                  onClick={() => {
                    setOpenResultPopup(false)
                    if (isSuccess) {
                      navigate(`/`)
                    }
                  }}
                >
                  ตกลง
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default JuniorSeniorSendingGift
