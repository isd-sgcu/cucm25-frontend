import { Container } from '../ui/container'
import { Button } from '../ui/button'
import { ArrowBack } from '@mui/icons-material'
import { Checkbox } from '../ui/checkbox'

interface VerifyInformationStep3Props {
  acceptances: {
    text: string
    checked: boolean
  }[]
  toggleAcceptance: (index: number) => void
  handleNextStep: () => void
  handlePreviousStep: () => void
}

function VerifyInformationStep3({
  acceptances,
  toggleAcceptance,
  handleNextStep,
  handlePreviousStep,
}: VerifyInformationStep3Props) {
  const allChecked = acceptances.every(a => a.checked)

  return (
    <>
      <div className='flex flex-col gap-8 justify-center items-center px-6 font-prompt'>
        <div className='flex flex-col items-center text-center'>
          <h1 className='font-bold text-5xl'>ข้อกำหนด</h1>
          <p className='font-normal text-2xl'>CUCM25 Reward</p>
        </div>

        <Container className='min-h-[100px] h-fit flex flex-col gap-4 justify-center py-6'>
          {acceptances.map((item, index) => (
            <label key={index} className='flex gap-2.5 title-medium'>
              <Checkbox
                checked={item.checked}
                onCheckedChange={() => toggleAcceptance(index)}
                className='h-5 w-5 border-2'
              />
              {item.text}
            </label>
          ))}
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
              disabled={!allChecked}
            >
              ถัดไป
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyInformationStep3
