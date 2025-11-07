import { Button } from '../ui/button'
import { ArrowBack } from '@mui/icons-material'
import { Container } from '../ui/container'

interface VerifyInformationStep4Props {
  handleNextStep: () => void
  handlePreviousStep: () => void
}

function VerifyInformationStep4({
  handleNextStep,
  handlePreviousStep,
}: VerifyInformationStep4Props) {
  return (
    <>
      <div className='flex flex-col gap-8 justify-center items-center px-6 font-prompt'>
        <div className='flex flex-col items-center text-center'>
          <h1 className='font-bold text-5xl'>กติกาการเล่น</h1>
          <p className='font-normal text-2xl'>CUCM25 Reward</p>
        </div>

        <Container className='min-h-[100px] overflow-y-auto flex flex-col gap-4 justify-center py-6'>
          {/* Just mocking graphic image */}
          <img alt='' src='/corner-bl.png' className='w-full h-auto' />
          <img alt='' src='/corner-bl.png' className='w-full h-auto' />
          <img alt='' src='/corner-tr.png' className='w-full h-auto' />
          <img alt='' src='/corner-tr.png' className='w-full h-auto' />
        </Container>

        <div className='flex flex-col items-center gap-2.5 text-center'>
          <div className='flex flex-row gap-4'>
            <Button
              size='custom'
              variant='outline'
              className='shadow-elevation-1 rounded-full body-large bg-white w-fit py-2.5 px-4 hover:bg-neutral-100 min-w-36'
              onClick={handlePreviousStep}
            >
              <ArrowBack />
              <span>ย้อนกลับ</span>
            </Button>
            <Button
              size={'custom'}
              className='shadow-elevation-1 rounded-full body-large w-fit py-2.5 px-4 min-w-36'
              onClick={handleNextStep}
            >
              ถัดไป
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyInformationStep4
