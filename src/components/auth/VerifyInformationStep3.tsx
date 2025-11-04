import { useState } from 'react'
import { Container } from '../ui/container'
import { Button } from '../ui/button'
import { ArrowBack } from '@mui/icons-material'
import { Input } from '../ui/input'

interface VerifyInformationStep3Props {
  handleNextStep: () => void
  handlePreviousStep: () => void
}

function VerifyInformationStep3({
  handleNextStep,
  handlePreviousStep,
}: VerifyInformationStep3Props) {
  const [acceptances, setAcceptances] = useState(
    [
      'ข้อกำหนด 1',
      'ข้อกำหนด 2',
      'ข้อกำหนด 3',
      'ข้อกำหนด 4',
      'ข้อกำหนด 5',
      'ข้อกำหนด 6',
      'ข้อกำหนด 7',
      'ข้อกำหนด 8',
      'ข้อกำหนด 9',
      'ข้อกำหนด 10',
      'ข้อกำหนด 11',
      'ข้อกำหนด 12',
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
            <label key={index} className='flex gap-2 items-center title-medium'>
              <Input
                type='checkbox'
                checked={item.checked}
                onChange={() => toggleAcceptance(index)}
                className="appearance-none cursor-pointer w-6 h-6
                  border-2 border-black rounded-sm bg-white flex items-center justify-center
                  leading-none checked:after:content-['✓'] 
                  checked:after:text-black checked:after:text-lg
                  "
              />
              {item.text}
            </label>
          ))}
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
            disabled={!allChecked}
          >
            ถัดไป
          </Button>
        </div>
      </div>
    </>
  )
}

export default VerifyInformationStep3
