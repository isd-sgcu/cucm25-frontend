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

/**
 * Renders the third verification step containing acceptance items with checkboxes and back/next navigation.
 *
 * Displays each acceptance text (splitting a leading label before a colon into bold main text when present),
 * lets the user toggle individual acceptances, and enables the Next button only when every acceptance is checked.
 *
 * @param acceptances - Array of acceptance entries; each entry provides `text` to display and a `checked` flag.
 * @param toggleAcceptance - Called with an acceptance index to toggle that acceptance's checked state.
 * @param handleNextStep - Called to proceed to the next step.
 * @param handlePreviousStep - Called to return to the previous step.
 * @returns The rendered React element for the verification step.
 */
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
          {acceptances.map((item, index) => {
            let main, content
            if (item.text.includes(':')) {
              const separatorIdx = item.text.indexOf(':')
              main = item.text.slice(0, separatorIdx).trim()
              content = item.text.slice(separatorIdx, item.text.length).trim()
            } else {
              main = ''
              content = item.text
            }
            return (
              <label key={index} className='flex gap-2.5 title-medium cursor-pointer'>
                <Checkbox
                  checked={item.checked}
                  onCheckedChange={() => toggleAcceptance(index)}
                  className='h-5 w-5 border-2 cursor-pointer'
                />
                <span>
                  <b>{main}</b> {content}
                </span>
              </label>
            )
          })}
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