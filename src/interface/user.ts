import type { EducationLevelType, UserRoleType } from '@/utils/const'

export interface UserInterface {
  id: string
  studentId: string
  username: string
  nickname: string
  firstname: string
  lastname: string
  role: UserRoleType
  education_level: EducationLevelType
  school: string | '-'
  points: number
  cumulative_points: number
}

export interface LeaderboardUser {
  nickname: string
  role: UserRoleType
  firstname: string
  lastname: string
  education_level: EducationLevelType
  cumulative_points: number
}
