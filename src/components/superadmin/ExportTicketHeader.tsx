import Logo from '../Logo'
import { useUser } from '@/context/User'

export default function ExportTicketHeader() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className='pt-8 pb-4 px-4 flex flex-col gap-8 rounded-b-2xl border shadow-make-cartoonish bg-grey'>
      <div className='flex flex-row justify-between items-center'>
        <Logo />
        <div className='flex flex-col items-end justify-center gap-1'>
          <div className='label-medium px-2.5 rounded-xl bg-purple text-center text-white'>
            {user.username}
          </div>
          <p className='label-small'>{user.firstname + " " + user.lastname + " (" + user.nickname + ")"}</p>
        </div>
      </div>
      <div className='w-full px-4'>
        <h1 className='display-small-emphasized text-black'>Export</h1>
        <p className='label-large'>Export ข้อมูลการซื้อ Ticket</p>
      </div>
    </div>
  )
}
