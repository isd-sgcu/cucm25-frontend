import type { EducationLevelType, UserRoleType } from '@/utils/const'
import type { WalletInterface } from './wallet'

export interface UserInterface {
  id: string
  studentId: string
  username: string
  nickname: string
  firstname: string
  lastname: string
  role: UserRoleType
  educationLevel: EducationLevelType
  school: string | '-'
  isResetUser: boolean
  termsAcceptedAt: Date | null
  wallets: WalletInterface
}

export interface LeaderboardUserInterface {
  nickname: string
  role: UserRoleType
  firstname: string
  lastname: string
  educationLevel: EducationLevelType
  cumulative_coin: number
}
