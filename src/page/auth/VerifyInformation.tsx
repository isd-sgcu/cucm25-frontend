import { useState } from 'react'
import VerifyInformationStep1 from '@/components/auth/VerifyInformationStep1'
import VerifyInformationStep3 from '@/components/auth/VerifyInformationStep3'

function VerifyInformation() {
  const [step, setStep] = useState(3)

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1)
  }

  return (
    <>
      <div className='absolute w-full h-full min-h-screen bg-light-pink sm:max-w-md mx-auto z-0'></div>
      <div className='min-h-screen w-full flex items-center justify-center z-10'>
        <div className='flex flex-col justify-between w-full sm:max-w-md mx-auto h-full'>
          <div className='flex justify-end'>
            <img src='/corner-tr.png' alt='Corner Decoration' />
          </div>
          <div className='py-2'>
            {step === 1 && <VerifyInformationStep1 handleNextStep={handleNextStep} />}
            {step === 3 && <VerifyInformationStep3 handleNextStep={handleNextStep} />}
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
