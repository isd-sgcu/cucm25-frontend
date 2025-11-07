import type { EducationLevelType, UserRoleType } from '@/utils/const'

export interface UserInterface {
  studentId: string
  username: string
  firstname: string
  lastname: string
  nickname: string
  education_level: EducationLevelType
  year: string
  role: UserRoleType
  school: string
  points: number
  cumulative_points: number
}

export interface LeaderboardUser {
  nickname: string
  role: 'junior' | 'senior'
  fullname: string
  year: string
  cumulative_points: number
}
