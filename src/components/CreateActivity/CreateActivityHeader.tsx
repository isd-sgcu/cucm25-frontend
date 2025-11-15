import Logo from '../Logo'
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

export default function CreateActivityHeader() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'junior';
  const mentionedRole = role === 'senior' ? 'พี่ค่าย' : 'น้องค่าย';

  return (
    <div className={clsx('pt-16 pb-4 px-4 flex flex-col gap-8 rounded-b-2xl border shadow-make-cartoonish',
      role === 'senior' ? 'bg-light-pink' : 'bg-yellow'
    )}>
      <div className='flex flex-row justify-between items-center'>
        <Logo />
        <div className='flex flex-col items-end justify-center gap-1'>
          <div className='label-medium px-2.5 rounded-xl bg-purple text-center text-white'>
            P 000
          </div>
          <p className='label-small'>นางสาวโยชิ มาแล้ว (โย)</p>
          <p className='label-small'>Moderator คนที่ X</p>
        </div>
      </div>
      <div className='w-full px-4'>
        <h1 className='display-small-emphasized text-black'>สร้างกิจกรรม</h1>
        <p className='label-large'>เพื่อสร้าง Code รับ Coin (สำหรับ{mentionedRole})</p>
      </div>
    </div>
  )
}
