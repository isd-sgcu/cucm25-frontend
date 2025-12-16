import type { LeaderboardUserInterface } from '@/interface/user'
import Axios from '@/lib/axios'
import type { UserRoleType } from '@/utils/const'

const BASE_URL = __API_ROOT__ + '/api/leaderboard'

export interface LeaderboardResponse {
  leaderboard: LeaderboardUserInterface[]
}

export const getLeaderboardUser = async (
  role: UserRoleType | undefined,
  limit: 3 | 30
): Promise<LeaderboardResponse> => {
  try {
    let formattedRole = ''
    if (role == 'STAFF' || role == 'PARTICIPANT') formattedRole = role
    const response = await Axios.get<LeaderboardResponse>(
      `${BASE_URL}?role=${formattedRole}&limit=${limit}`
    )
    return response.data
  } catch (error: any) {
    throw new Error('Unexpected error during getLeaderboardUser: ', error)
  }
}
