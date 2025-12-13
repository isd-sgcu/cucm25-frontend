import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VerifyInformationStep1 from '@/components/auth/VerifyInformationStep1'
import VerifyInformationStep2 from '@/components/auth/VerifyInformationStep2'
import VerifyInformationStep3 from '@/components/auth/VerifyInformationStep3'
import { useUser } from '@/context/User'
import Dialog from '@/components/Dialog'
import type { QuestionInterface } from '@/interface/question'
import { cucmAcceptances, participantQuestions, seniorQuestions } from '@/utils/const'
import { onboarding } from '@/api/user'

/**
 * Render the multi-step user verification and onboarding UI.
 *
 * Displays step-based verification screens, validates answers and required acceptances,
 * submits onboarding data, and navigates the user to the appropriate post-onboarding route
 * based on their role. If the current user is missing or has already accepted terms,
 * the component redirects or shows an error dialog accordingly.
 *
 * @returns The verification flow as a JSX element.
 */
function VerifyInformation() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const { user } = useUser()
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const [validationError, setValidationError] = useState<string>('')
  const [questions, setQuestions] = useState<QuestionInterface[]>([])
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [acceptances, setAcceptances] = useState(cucmAcceptances)
  const [sentFormLoading, setSentFormLoading] = useState(false)

  const toggleAcceptance = (index: number) => {
    setAcceptances(prev =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    )
  }

  const handleSubmitForm = async () => {
    // Validate form
    if (Object.keys(formData).length !== questions.length) {
      setValidationError('กรุณาตอบคำถามให้ครบทุกข้อ')
      return
    }
    if (!acceptances.every(a => a.checked)) {
      setValidationError('กรุณายอมรับข้อกำหนดทั้งหมด')
      return
    }

    // Clear any previous errors
    setValidationError('')
    setSentFormLoading(true)

    try {
      await onboarding(formData)
      if (user?.role === 'PARTICIPANT' || user?.role === 'STAFF') {
        navigate('/')
      } else if (user?.role === 'MODERATOR') {
        navigate('/moderator')
      } else if (user?.role === 'ADMIN') {
        navigate('/superadmin')
      } else {
        navigate('/auth/login')
      }
    } catch (err: any) {
      setValidationError(err.message || 'เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง')
    }

    setSentFormLoading(true)
  }

  const handleCloseDialog = () => {
    setIsAlertOpen(false)
    navigate('/auth/login')
  }

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1)
  }

  const handlePreviousStep = () => {
    setStep(prevStep => prevStep - 1)
  }

  const getBackgroundColor = () => {
    if (step === 1) return 'bg-light-pink'
    if (step === 2) return user?.role === 'PARTICIPANT' ? 'bg-light-yellow' : 'bg-light-pink'
    if (step === 3) return 'bg-light-pink'
    return 'bg-light-pink'
  }

  useEffect(() => {
    if (user?.termsAcceptedAt) {
      if (user.role === 'PARTICIPANT' || user.role === 'STAFF') {
        navigate('/')
      } else if (user.role === 'MODERATOR') {
        navigate('/moderator')
      } else if (user.role === 'ADMIN') {
        navigate('/superadmin')
      } else {
        navigate('/auth/login')
      }
    }
  }, [user, navigate])

  useEffect(() => {
    // Check if user exists, if not show error
    if (!user) {
      setIsAlertOpen(true)
      return
    }

    // Initialize questions only once
    if (questions.length === 0) {
      if (user.role === 'PARTICIPANT') {
        setQuestions(participantQuestions)
      } else {
        setQuestions(seniorQuestions)
      }
    }
  }, [questions.length, user])

  if (!user) {
    return (
      <Dialog
        title='เกิดข้อผิดพลาด'
        description='ไม่สามารถดึงข้อมูลผู้ใช้ได้ กรุณาลองใหม่อีกครั้ง'
        actionText='ตกลง'
        isOpen={isAlertOpen}
        handleOpenDialog={handleCloseDialog}
        onActionClick={handleCloseDialog}
      />
    )
  }

  return (
    <>
      {validationError && (
        <div className='fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red/10 border border-red/30 rounded-xl p-3 shadow-lg animate-in fade-in slide-in-from-top-4'>
          <p className='text-center body-large text-red'>{validationError}</p>
        </div>
      )}

      <div
        className={`absolute w-full min-h-screen sm:max-w-md mx-auto z-0 ${getBackgroundColor()}`}
      ></div>

      <div className='min-h-screen w-full flex items-center justify-center z-10'>
        <div className='flex flex-col justify-between w-full sm:max-w-md mx-auto h-full'>
          <div className='flex justify-end'>
            <img src='/corner-tr.png' alt='Corner Decoration' />
          </div>

          <div className='py-2'>
            {step === 1 && <VerifyInformationStep1 handleNextStep={handleNextStep} />}
            {step === 2 && (
              <VerifyInformationStep2
                questions={questions}
                formData={formData}
                setFormData={setFormData}
                handleNextStep={handleNextStep}
                handlePreviousStep={handlePreviousStep}
              />
            )}
            {step === 3 && (
              <VerifyInformationStep3
                acceptances={acceptances}
                sentFormLoading={sentFormLoading}
                toggleAcceptance={toggleAcceptance}
                handleNextStep={handleSubmitForm}
                handlePreviousStep={handlePreviousStep}
              />
            )}
          </div>

          <div className='flex justify-start'>
            <img src='/corner-bl.png' alt='Corner Decoration' />
          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyInformation
