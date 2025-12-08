import Axios from '@/lib/axios'

const BASE_URL = __API_ROOT__ + '/api/code'

export interface RedeemInterface {
  success: boolean
  message: string
  rewardCoin: number
  newBalance: number
  transactionId: number
}

export interface RedeemResponse {
  success: boolean
  data: RedeemInterface
}

export const redeem = async (codeString: string): Promise<RedeemInterface> => {
  try {
    const response = await Axios.post<RedeemResponse>(`${BASE_URL}/redeem`, {
      codeString,
    })
    return response.data.data
  } catch (error: any) {
    const status = error.response?.status
    if (status === 400) throw new Error('Missing required fields')
    if (status === 401) throw new Error('Authentication required')
    if (status === 403) throw new Error('Insufficient Permission')
    if (status === 503) throw new Error('System disabled for your role')
    throw new Error('Unexpected error during login')
  }
}
