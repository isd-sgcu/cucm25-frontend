import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VerifyInformationStep1 from '@/components/auth/VerifyInformationStep1'
import VerifyInformationStep3 from '@/components/auth/VerifyInformationStep3'
import VerifyInformationStep4 from '@/components/auth/VerifyInformationStep4'

function VerifyInformation() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 3)
  }

  const handlePreviousStep = () => {
    setStep(prevStep => prevStep - 3)
  }

  const navigateToMainPage = () => {
    navigate('/')
  }

  return (
    <>
      <div
        className={`relative min-h-screen w-full flex items-center justify-center ${
          step === 1
            ? 'bg-light-pink'
            : step === 2
            ? 'bg-light-yellow'
            : step === 3
            ? 'bg-light-pink'
            : step === 4
            ? 'bg-light-blue'
            : ''
        }`}
      >
        {/* Corners */}
        <img
          src='/corner-tr.png'
          className='absolute top-0 right-0 pointer-events-none select-none z-0'
        />
        <img
          src='/corner-bl.png'
          className='absolute bottom-0 left-0 pointer-events-none select-none z-0'
        />

        <div className='relative z-10 w-full sm:max-w-md h-screen overflow-y-auto py-16 px-4'>
          {step === 1 && <VerifyInformationStep1 handleNextStep={handleNextStep} />}
          {step === 3 && (
            <VerifyInformationStep3
              handleNextStep={handleNextStep}
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
      </div>
    </>
  )
}

export default VerifyInformation
