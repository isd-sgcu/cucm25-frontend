import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VerifyInformationStep1 from '@/components/auth/VerifyInformationStep1'
import VerifyInformationStep3 from '@/components/auth/VerifyInformationStep3'
import VerifyInformationStep4 from '@/components/auth/VerifyInformationStep4'

function VerifyInformation() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1)
  }

  const handlePreviousStep = () => {
    setStep(prevStep => prevStep - 1)
  }

  const navigateToMainPage = () => {
    navigate('/')
  }

  return (
    <>
      <div
        className={`absolute w-full h-full min-h-screen sm:max-w-md mx-auto z-0 ${step === 1
          ? 'bg-light-pink'
          : step === 2
            ? 'bg-light-yellow'
            : step === 3
              ? 'bg-light-pink'
              : step === 4
                ? 'bg-light-blue'
                : ''
          }`}
      ></div>
      <div className='min-h-screen w-full flex items-center justify-center z-10'>
        <div className='flex flex-col justify-between w-full sm:max-w-md mx-auto h-full'>
          <div className='flex justify-end'>
            <img src='/corner-tr.png' alt='Corner Decoration' />
          </div>
          <div className='py-2'>
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
          <div className='flex justify-start'>
            <img src='/corner-bl.png' alt='Corner Decoration' />
          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyInformation
