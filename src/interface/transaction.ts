export interface CoinHistory {
  id: string
  name: string
  type: 'person' | 'event' | 'account'
  coins: number
  timestamp: Date
}

export interface GiftHistory {
  id: string
  name: string
  timestamp: Date
}
