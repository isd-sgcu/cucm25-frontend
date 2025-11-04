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
          <img src='/corner-bl.png' className='w-full h-auto' />
          <img src='/corner-bl.png' className='w-full h-auto' />
          <img src='/corner-tr.png' className='w-full h-auto' />
          <img src='/corner-tr.png' className='w-full h-auto' />
        </Container>

        <div className='w-full flex items-center gap-2 justify-center flex-wrap'>
          <Button
            size='md'
            variant='outline'
            className='shadow-elevation-1 rounded-full body-large bg-white'
            onClick={handlePreviousStep}
          >
            <ArrowBack />
            <span>ย้อนกลับ</span>
          </Button>

          <Button
            size='md'
            className='shadow-elevation-1 rounded-full body-large'
            onClick={handleNextStep}
          >
            ถัดไป
          </Button>
        </div>
      </div>
    </>
  )
}

export default VerifyInformationStep4
