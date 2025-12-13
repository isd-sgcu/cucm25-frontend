import Axios from '@/lib/axios'

const BASE_URL = __API_ROOT__ + '/api/system'

export interface ToggleInterface {
  success: boolean
  message: string
  settingKey: string
  enabled: boolean
  updatedAt: string
}

export interface ToggleResponse {
  success: true
  data: ToggleInterface
}

export const updateToggle = async (
  settingKey: string,
  enabled: boolean
): Promise<ToggleInterface> => {
  try {
    const response = await Axios.post<ToggleResponse>(`${BASE_URL}/toggle`, {
      settingKey,
      enabled
    })
    return response.data.data
  } catch (error: any) {
    const status = error.response?.status
    if (status === 400) throw new Error('Invalid settingKey or enabled value')
    if (status === 401) throw new Error('Authentication required')
    if (status === 403) throw new Error('Only admins and moderators allowed')
    if (status === 404) throw new Error('User not found')
    throw new Error('Unexpected error during updateToggle: ', error)
  }
}

export interface StatusInterface {
  juniorLoginEnabled: boolean
  modLoginEnabled: boolean
  seniorLoginEnabled: boolean
  giftHourlyQuota: number
  lastUpdated: string
}

export interface StatusResponse {
  success: boolean
  data: StatusInterface
}

export const getStatus = async (): Promise<StatusInterface> => {
  try {
    const response = await Axios.get<StatusResponse>(`${BASE_URL}/status`)
    return response.data.data
  } catch (error: any) {
    throw new Error('Unexpected error during getStatus: ', error)
  }
}

export interface SetSystemInterface {
  setting_key: string,
  setting_value: string,
  description: string,
  updated_at: string
}

export interface SetSystemResponse {
  success: boolean
  data: {
    success: boolean,
    message: string,
    newSettings: SetSystemInterface[]
  }
}

export const setSystemSetting = async (
  ticket_price?: number,
  gift_hourly_quota?: number
) => {
  try {
    const response = await Axios.patch<SetSystemResponse>(`${BASE_URL}/set`, {
      ticket_price,
      gift_hourly_quota
    })
    return response.data
  } catch (error: any) {
    const status = error.response?.status
    if (status === 400) throw new Error('No settings provided to update')
    if (status === 401) throw new Error('Authentication required')
    if (status === 404) throw new Error('User not found')
    throw new Error('Unexpected error during setSystemSetting: ', error)
  }
}