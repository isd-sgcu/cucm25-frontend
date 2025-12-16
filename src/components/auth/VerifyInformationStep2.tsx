import { Button } from '../ui/button'
import { Container } from '../ui/container'
import { ArrowBack } from '@mui/icons-material'
import type { QuestionInterface } from '@/interface/question'
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

interface VerifyInformationStep1Props {
  questions: QuestionInterface[]
  formData: { [key: string]: string }
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
  handlePreviousStep: () => void
  handleNextStep: () => void
}

function VerifyInformationStep2({
  questions,
  formData,
  setFormData,
  handleNextStep,
  handlePreviousStep,
}: VerifyInformationStep1Props) {
  return (
    <>
      <div className='flex flex-col gap-8 justify-center items-center px-6 font-prompt'>
        <div className='flex flex-col items-center text-center'>
          <h1 className='font-bold text-5xl'>ขั้นตอนที่ 2</h1>
          <p className='font-normal text-2xl text-wrap'>ตอบคำถาม เพื่อให้สำหรับทำความรู้จัก</p>
        </div>
        <Container className='flex flex-col gap-4 pb-5'>
          {questions.map(question => {
            return (
              <div className='flex flex-col gap-2' key={question.id}>
                <label className='label-large'>
                  <span className='font-semibold'>{question.title}</span>
                </label>
                <DropdownMenu color='light-blue'>
                  <DropdownMenuTrigger>
                    {formData[question.id] || 'กรุณาเลือกคำตอบ'}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='mt-2'>
                    <DropdownMenuGroup>
                      {question.answers.map(ans => (
                        <DropdownMenuItem
                          key={ans}
                          onClick={() =>
                            setFormData(prev =>
                              prev
                                ? {
                                    ...prev,
                                    [question.id]: ans,
                                  }
                                : prev
                            )
                          }
                        >
                          {ans}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )
          })}
        </Container>
        <div className='flex flex-col items-center gap-2.5 text-center'>
          <p className='font-normal text-[15px] text-wrap'>
            ไม่สามารถแก้ไขคำตอบภายหลังได้
            <br />
            โปรดตอบตามความเป็นจริง
          </p>
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
              disabled={questions.some(q => !formData[q.id])}
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

export default VerifyInformationStep2
