import type { CoinHistory, GiftHistory } from '@/interface/transaction'
import Axios from '@/lib/axios'

const BASE_URL = __API_ROOT__ + '/api/transaction/history'

interface CoinHistoryResponse {
  data: CoinHistory[]
}

export const getCoinsHistory = async () => {
  try {
    const res = await Axios.get<CoinHistoryResponse>(`${BASE_URL}/coins`)
    return res.data.data
  } catch (error: any) {
    throw new Error('Unexpected error during getCoinsHistory: ', error)
  }
}

interface GiftsHistoryResponse {
  data: GiftHistory[]
}

export const getGiftsHistory = async () => {
  try {
    const res = await Axios.get<GiftsHistoryResponse>(`${BASE_URL}/gifts`)
    return res.data.data
  } catch (error: any) {
    throw new Error('Unexpected error during getGiftsHistory: ', error)
  }
}
