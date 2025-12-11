import RankBar from '@/components/Rankbar'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { useUser } from '@/context/User'
import type { LeaderboardUserInterface } from '@/interface/user'
import { type UserRoleType } from '@/utils/const'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Logo from '@/components/Logo'
import { formatEducation } from '@/utils/function'
import { getLeaderboardUser } from '@/api/leaderboard'

function JuniorSeniorLeaderboard() {
  const { user } = useUser()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const roleFromURL = searchParams.get('role')
  const [leaderboardFilter, setLeaderboardFilter] = useState<string | null>(roleFromURL)

  const [filteredLeaderboardUsers, setFilteredLeaderboardUsers] = useState<
    LeaderboardUserInterface[]
  >([])

  const fetchLeaderboard = async (role: UserRoleType | undefined) => {
    try {
      const res = await getLeaderboardUser(role, 30)
      setFilteredLeaderboardUsers(res.leaderboard)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const role =
      roleFromURL === 'STAFF' || roleFromURL === 'PARTICIPANT'
        ? (roleFromURL as UserRoleType)
        : undefined

    fetchLeaderboard(role)
  }, [])

  useEffect(() => {
    const role =
      leaderboardFilter === 'STAFF' || leaderboardFilter === 'PARTICIPANT'
        ? (leaderboardFilter as UserRoleType)
        : undefined

    fetchLeaderboard(role)
  }, [leaderboardFilter])

  return (
    <div className='w-full h-fit min-h-screen bg-white flex flex-col'>
      {/* Header */}
      <div className='w-full h-fit flex flex-col gap-6 bg-yellow border rounded-b-xl shadow-make-cartoonish mb-6 px-2 py-4'>
        {/* User Information */}
        <div className='flex gap-4 justify-between items-center'>
          <Logo />
          <div className='flex flex-col items-end flex-wrap gap-0.5'>
            <p className='label-medium text-end flex items-center'>
              <span
                className={`${
                  user?.role === 'PARTICIPANT'
                    ? 'bg-yellow text-black border-black'
                    : user?.role == 'STAFF'
                    ? 'bg-vivid-pink text-white border-black'
                    : ''
                } rounded-full px-2 border shadow-make-cartoonish-1 mr-2`}
              >
                {user?.username.toUpperCase()}
              </span>
              <span>
                {user?.role === 'PARTICIPANT'
                  ? 'น้องค่าย'
                  : user?.role == 'STAFF'
                  ? 'พี่ค่าย'
                  : 'undefined'}
              </span>
            </p>
            <p className='label-medium text-end'>
              {user?.firstname} {user?.lastname}
            </p>
            <p className='label-medium text-end'>
              <span>{formatEducation(user?.educationLevel)} </span>
              <span>{user?.school}</span>
            </p>
          </div>
        </div>

        {/* Page Name */}
        <div className='flex gap-1 items-center cursor-pointer' onClick={() => navigate(-1)}>
          <Icon icon='solar:alt-arrow-left-linear' className='w-6 h-6' />
          <h1 className='display-small truncate overflow-hidden whitespace-nowrap'>
            <span className='font-medium'>Leaderboard</span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className='w-full h-fit flex bg-white flex-col flex-1 px-4'>
        {/* Buttons */}
        <div className='grid grid-cols-[1fr_1fr] gap-2 w-full justify-center min-h-6 mb-4'>
          <Button
            variant={leaderboardFilter !== 'STAFF' ? 'outline' : 'default'}
            color={leaderboardFilter !== 'STAFF' ? 'black' : 'vivid-pink'}
            className={`w-auto h-fit rounded-full transition-colors duration-200 ${
              leaderboardFilter === 'STAFF' && 'shadow-make-cartoonish-2'
            }`}
            onClick={() => setLeaderboardFilter(prev => (prev === 'STAFF' ? null : 'STAFF'))}
          >
            พี่ค่าย
          </Button>

          <Button
            variant={leaderboardFilter !== 'PARTICIPANT' ? 'outline' : 'default'}
            color={leaderboardFilter !== 'PARTICIPANT' ? 'black' : 'vivid-pink'}
            className={`w-auto h-fit rounded-full transition-colors duration-200 ${
              leaderboardFilter === 'PARTICIPANT' && 'shadow-make-cartoonish-2'
            }`}
            onClick={() =>
              setLeaderboardFilter(prev => (prev === 'PARTICIPANT' ? null : 'PARTICIPANT'))
            }
          >
            น้องค่าย
          </Button>
        </div>

        {/* Leaderboard */}
        <div className='flex flex-col gap-4 w-full h-full mb-6'>
          {/* Bars */}
          <div className='grid grid-cols-[1fr_1fr_1fr] gap-2 w-full justify-center'>
            {[0, 1, 2].map(idx =>
              filteredLeaderboardUsers[idx] ? (
                <RankBar
                  key={idx}
                  rank={idx + 1}
                  nickname={filteredLeaderboardUsers[idx].nickname}
                  firstname={filteredLeaderboardUsers[idx].firstname}
                  lastname={filteredLeaderboardUsers[idx].lastname}
                  educationLevel={filteredLeaderboardUsers[idx].educationLevel}
                  cumulative_coin={filteredLeaderboardUsers[idx].cumulative_coin}
                />
              ) : (
                <RankBar key={idx} rank={idx + 1} />
              )
            )}
          </div>

          {/* Table */}
          <Container className='flex flex-col flex-1'>
            <table className='w-full border-collapse border-spacing-y-2'>
              <tbody>
                {Array.from({ length: 27 }).map((_, idx) => {
                  const userIndex = idx + 3
                  const user = filteredLeaderboardUsers[userIndex]

                  const rankNumber = userIndex + 1

                  return (
                    <tr key={idx}>
                      <td className='title-small p-1'>
                        <span className='font-semibold'>{rankNumber}</span>
                      </td>

                      <td className='title-small p-1'>{user ? user.nickname : '-'}</td>

                      <td className='label-medium p-1'>
                        {user
                          ? `${user.firstname} ${user.lastname} ${formatEducation(
                              user.educationLevel
                            )}`
                          : '-'}
                      </td>

                      <td className='title-small p-1 text-right'>
                        <span className='font-semibold'>{user ? user.cumulative_coin : '-'}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default JuniorSeniorLeaderboard
