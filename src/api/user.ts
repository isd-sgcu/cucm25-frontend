import type { UserInterface } from '@/interface/user'
import Axios from '@/lib/axios'

const BASE_URL = __API_ROOT__ + '/api/user'

export interface OnBoardingResponse {
  message: string
}

export const onboarding = async (answers: Record<string, string>): Promise<OnBoardingResponse> => {
  try {
    const payload = Object.entries(answers).map(([questionId, optionText]) => ({
      questionId,
      optionText,
    }))

    const response = await Axios.post<OnBoardingResponse>(`${BASE_URL}/onboarding`, {
      answers: payload,
    })

    return response.data
  } catch (error: any) {
    const status = error.response?.status

    switch (status) {
      case 400:
        throw new Error('Invalid onboarding request')
      case 403:
        throw new Error('Onboarding is not allowed for this user role')
      case 404:
        throw new Error('User does not exist')
      case 500:
        throw new Error('Unexpected error')
      default:
        throw new Error('Unexpected error')
    }
  }
}

export interface ResetResponse {
  message: string
}

export const reset = async (username: string): Promise<ResetResponse> => {
  try {
    const response = await Axios.post<ResetResponse>(`${BASE_URL}/reset`, {
      username: username.toLowerCase(),
    })

    return response.data
  } catch (error: any) {
    const status = error.response?.status

    switch (status) {
      case 400:
        throw new Error('Invalid reset user request')
      case 403:
        throw new Error('Onboarding is not allowed for this user role')
      case 404:
        throw new Error('User does not exist')
      case 500:
        throw new Error('Unexpected error')
      default:
        throw new Error('Unexpected error')
    }
  }
}

export interface UserResponse {
  user: UserInterface | null
}

export const getUser = async (username: string): Promise<UserResponse> => {
  try {
    const response = await Axios.get<UserResponse>(`${BASE_URL}/${username}`)
    return response.data
  } catch (error: any) {
    const status = error.response?.status
    if (status === 400) throw new Error('Invalid get user request')
    if (status === 403) throw new Error('Insufficient permission')
    throw new Error('Unexpected error ')
  }
}

export const adjustCoin = async ({
  username,
  action,
  amount
}:{
  username: string,
  action: 'increment' | 'decrement',
  amount: number
}): Promise<void> => {
  try {
    await Axios.patch(`${BASE_URL}/adjust-coins`, {
      username,
      action,
      amount
    })
  } catch (error: any) {
    const status = error.response?.status
    switch (status) {
      case 400:
        throw new Error('Invalid amount')
      case 403:
        throw new Error('Insufficient permission')
      case 404:
        throw new Error('User does not exist')
      default:
        throw new Error('Unexpected error during adjusting coins')
    }
  }
}
export interface PayResponse {
  success: boolean
  message: string
}

export interface PayFormInterface {
  amount: number
}

export const pay = async (payForm: PayFormInterface): Promise<PayResponse> => {
  try {
    const response = await Axios.post<PayResponse>(`${BASE_URL}/pay`, payForm)
    return response.data
  } catch (error: any) {
    const status = error.response?.status
    if (status === 400) throw new Error('Invalid payment request')
    if (status === 403) throw new Error('Insufficient permission')
    throw new Error('Unexpected error')
  }
}
