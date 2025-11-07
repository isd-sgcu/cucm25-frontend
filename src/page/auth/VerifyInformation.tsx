import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VerifyInformationStep1 from '@/components/auth/VerifyInformationStep1'
import VerifyInformationStep2 from '@/components/auth/VerifyInformationStep2'
import VerifyInformationStep3 from '@/components/auth/VerifyInformationStep3'
import VerifyInformationStep4 from '@/components/auth/VerifyInformationStep4'
import { useUser } from '@/context/User'
import Dialog from '@/components/Dialog'
import type { QuestionInterface } from '@/interface/question'
import { mockQuestions } from '@/utils/const'

function VerifyInformation() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const { user } = useUser()
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const [validationError, setValidationError] = useState<string>('')
  const [questions, setQuestions] = useState<QuestionInterface[]>([])
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [acceptances, setAcceptances] = useState(
    [
      'ข้อกำหนด 1 try to write a very long text to see how it looks like in the container',
      'ข้อกำหนด 2',
      'ข้อกำหนด 3',
      'ข้อกำหนด 4',
      'ข้อกำหนด 5',
      'ข้อกำหนด 6',
      'ข้อกำหนด 7',
      'ข้อกำหนด 8',
    ].map(text => ({
      text,
      checked: false,
    }))
  )

  const toggleAcceptance = (index: number) => {
    setAcceptances(prev =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    )
  }

  const handleSubmitForm = () => {
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

    // Send data (replace with actual API call)
    console.log('Submitting form data:', formData)

    // Success - move to step 4
    handleNextStep()
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

  const navigateToMainPage = () => {
    navigate('/')
  }

  const getBackgroundColor = () => {
    if (step === 1) return 'bg-light-pink'
    if (step === 2) return user?.role === 'PARTICIPANT' ? 'bg-light-yellow' : 'bg-light-pink'
    if (step === 3) return 'bg-light-pink'
    if (step === 4) return 'bg-light-blue'
    return 'bg-light-pink'
  }

  useEffect(() => {
    // Check if user exists, if not show error
    if (!user) {
      setIsAlertOpen(true)
      return
    }

    // Initialize questions only once
    if (questions.length === 0) {
      setQuestions(mockQuestions)
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
        className={`absolute w-full h-full min-h-screen sm:max-w-md mx-auto z-0 ${getBackgroundColor()}`}
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
                toggleAcceptance={toggleAcceptance}
                handleNextStep={handleSubmitForm}
                handlePreviousStep={handlePreviousStep}
              />
            )}
            {step === 4 && (
              <VerifyInformationStep4
                handleNextStep={navigateToMainPage}
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
