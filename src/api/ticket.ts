import Axios from '@/lib/axios'

const BASE_URL = __API_ROOT__ + '/api/ticket'

export interface PriceInterface {
  price: number
}

export interface PriceResponse {
  success: boolean
  data: PriceInterface
}

export const getTicketPrice = async (): Promise<number> => {
  try {
    const response = await Axios.get<PriceResponse>(`${BASE_URL}/price`)
    return response.data.data.price
  } catch (error: any) {
    throw new Error('Unexpected error during getTicketPrice: ', error)
  }
}
