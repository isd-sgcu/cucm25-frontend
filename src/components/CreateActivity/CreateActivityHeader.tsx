import Logo from '../Logo'
import { useSearchParams } from 'react-router-dom'
import clsx from 'clsx'
import { useUser } from '@/context/User'
import { useNavigate } from 'react-router-dom'

export default function CreateActivityHeader() {
  const [searchParams] = useSearchParams()
  const role = searchParams.get('role') || 'junior'
  const mentionedRole = role === 'senior' ? 'พี่ค่าย' : 'น้องค่าย'
  const { user } = useUser()
  const navigate = useNavigate()

  if (!user) {
    navigate('/auth/login')
    return null
  }

  return (
    <div
      className={clsx(
        'pt-8 pb-4 px-4 flex flex-col gap-8 rounded-b-2xl border shadow-make-cartoonish',
        role === 'senior' ? 'bg-light-pink' : 'bg-yellow'
      )}
    >
      <div className='flex flex-row justify-between items-center'>
        <Logo />
        <div className='flex flex-col items-end justify-center gap-1'>
          <div className='label-medium px-2.5 rounded-xl bg-purple text-center text-white'>
            {user.username}
          </div>
          <div className='text-right'>
            <p className='label-small'>{user.firstname + ' ' + user.lastname + ' (' + user.nickname + ')'}</p>
          </div>
        </div>
      </div>
      <div className='w-full px-4'>
        <h1 className='display-small-emphasized text-black'>สร้างกิจกรรม</h1>
        <p className='label-large'>เพื่อสร้าง Code รับ Coin (สำหรับ{mentionedRole})</p>
      </div>
    </div>
  )
}
