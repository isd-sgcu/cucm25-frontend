import type { UserRoleType } from '@/utils/const'

export interface CoinHistory {
  correspondentName: string
  correspondentRole: UserRoleType
  amount: number
  timestamp: string
  action: 'sent' | 'received'
}

export interface GiftHistory {
  recipientName: string
  amount: number
  timestamp: string
}
