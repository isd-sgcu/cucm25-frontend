import type { EducationLevelType } from '@/utils/const'
import { formatEducation } from '@/utils/function'
import { Icon } from '@iconify/react'

interface RankBarProps {
  rank: number
  nickname?: string
  firstname?: string
  lastname?: string
  educationLevel?: EducationLevelType
  cumulative_coin?: number
}

const RankBar: React.FC<RankBarProps> = ({
  rank,
  nickname,
  firstname,
  lastname,
  educationLevel,
  cumulative_coin,
}) => {
  if (rank != 1 && rank != 2 && rank != 3) return

  const rankStyles = {
    1: { height: 250, bgColor: 'bg-pink', icon: 'solar:cup-star-linear' },
    2: {
      height: 200,
      bgColor: 'bg-yellow',
      icon: 'solar:medal-ribbon-star-linear',
    },
    3: {
      height: 150,
      bgColor: 'bg-light-blue',
      icon: 'solar:medal-ribbon-star-linear',
    },
  } as const

  const { height, bgColor, icon } = rankStyles[rank]

  return (
    <div className='flex flex-col gap-2 items-center justify-end w-full'>
      <Icon icon={icon} className='w-5 h-5' />
      <div
        className={`${bgColor} w-full flex flex-col justify-between px-1 py-3 rounded-2xl border shadow-make-cartoonish`}
        style={{ height }}
      >
        {/* Name */}
        <div className='flex flex-col items-center'>
          <p className='title-medium text-center line-clamp-2'>
            <span className='font-semibold'>{nickname || '-'}</span>
          </p>
          <p className='label-small text-center line-clamp-2'>
            {firstname || lastname ? `${firstname} ${lastname}` : '-'}
          </p>
          <p className='label-small text-center line-clamp-2'>
            {educationLevel ? formatEducation(educationLevel) : '-'}
          </p>
        </div>

        {/* Coins */}
        <div className='flex flex-col items-center'>
          <p className='title-medium text-center'>
            <span className='font-semibold'>{cumulative_coin || '-'}</span>
          </p>
          <p className='label-small text-center'>
            {!cumulative_coin ? '' : cumulative_coin == 1 ? 'Coin' : 'Coins'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default RankBar
