import type { UserRoleType } from '@/utils/const'

export interface UserInterface {
  studentId: string
  username: string
  firstname: string
  lastname: string
  nickname: string
  education_level: 'มัธยม' | 'มหาลัย'
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
