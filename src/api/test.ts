import Axios from '@/lib/axios'

const BASE_URL = __API_ROOT__

export interface HealthResponse {
  status: string
  timeStamp: string
  uptime: number
}

export const getHealth = async (): Promise<HealthResponse> => {
  try {
    const response = await Axios.get<HealthResponse>(`${BASE_URL}/health`)
    return response.data
  } catch (error: any) {
    throw new Error('Unexpected error during getHealth: ', error)
  }
}
