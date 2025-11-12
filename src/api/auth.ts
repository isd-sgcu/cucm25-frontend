import type { UserInterface } from '@/interface/user'
import Axios from '@/lib/axios'

export interface LoginResponse {
  token: string
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await Axios.post<LoginResponse>('/auth/login', {
      username,
      password,
    })
    return response.data
  } catch (error: any) {
    const status = error.response?.status
    if (status === 400) throw new Error('Missing username or password')
    if (status === 401) throw new Error('Invalid username or password')
    throw new Error('Unexpected error during login')
  }
}

export interface MeResponse {
  user: UserInterface | null
}

export const getMe = async (): Promise<MeResponse> => {
  try {
    const response = await Axios.get<MeResponse>('/auth/me')
    return response.data
  } catch (error: any) {
    const status = error.response?.status
    if (status === 400) throw new Error('Missing username or password')
    if (status === 401) throw new Error('Invalid or expired token')
    throw new Error('Unexpected error while fetching user data')
  }
}
