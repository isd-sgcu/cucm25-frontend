import Axios from '@/lib/axios'

const BASE_URL = __API_ROOT__ + '/api/system'

export interface ToggleResponse {
  success: boolean
  message: string
  settingKey: string
  enabled: boolean
  updatedAt: string
}

export const updateToggle = async (
  settingKey: string,
  enabled: boolean
): Promise<ToggleResponse> => {
  try {
    const response = await Axios.post<ToggleResponse>(`${BASE_URL}/toggle`, { settingKey, enabled })
    return response.data
  } catch (error: any) {
    const status = error.response?.status
    if (status === 400) throw new Error('Invalid settingKey or enabled value')
    if (status === 401) throw new Error('Authentication required')
    if (status === 403) throw new Error('Only admins and moderators allowed')
    if (status === 404) throw new Error('User not found')
    throw new Error('Unexpected error during updateToggle: ', error)
  }
}

export interface StatusResponse {
  juniorLoginEnabled: boolean
  modLoginEnabled: boolean
  seniorLoginEnabled: boolean
  giftHourlyQuota: number
  lastUpdated: string
}

export const getStatus = async (): Promise<StatusResponse> => {
  try {
    const response = await Axios.get<StatusResponse>(`${BASE_URL}/status`)
    return response.data
  } catch (error: any) {
    throw new Error('Unexpected error during getStatus: ', error)
  }
}
