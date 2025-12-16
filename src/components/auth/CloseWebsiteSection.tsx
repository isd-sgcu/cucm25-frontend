import { useNavigate } from 'react-router-dom'

/**
 * Render a "site temporarily closed" section with a message and a button that navigates to the login page.
 *
 * @returns The React element for the closed-site section.
 */
function CloseWebsiteSection() {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <img src='/close-website.png' alt='Close Website' className='w-36' />
      <div className='flex flex-col gap-2'>
        <h1 className='font-medium text-center display-small-emphasized'>ปิดระบบชั่วคราว</h1>
        <div className='flex flex-col gap-1 pb-6'>
          <p className='title-small text-center'>แล้วเจอกันใหม่เร็ว ๆ นี้</p>
          <p className='title-small text-center'>ระหว่างนี้อย่าลืมสนุกไปกับหลายกิจกรรม ;)</p>
        </div>
        <button
          className='cursor-pointer disabled:cursor-default rounded-[100px] shadow-elevation-1 px-4 py-2.5 w-full max-w-[248px] font-normal bg-purple text-white border-purple hover:bg-purple/90 disabled:text-white/70'
          type='button'
          onClick={() => {
            navigate('/auth/login')
          }}
        >
          เข้าสู่ระบบอีกครั้ง
        </button>
      </div>
    </div>
  )
}

export default CloseWebsiteSection
