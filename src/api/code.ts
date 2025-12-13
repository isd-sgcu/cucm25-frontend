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
    const message = error.response?.data?.error || error.error;
      if (message === 'Code not found') {
        throw new Error('รหัสกิจกรรมไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง')
      } else if (message === 'Code has expired') {
        throw new Error('รหัสกิจกรรมหมดอายุแล้ว')
      } else if (message === 'You have already redeemed this code') {
        throw new Error('รหัสกิจกรรมนี้ถูกใช้ไปแล้ว')
      } else if (message === 'This code is only for junior role') {
        throw new Error('รหัสกิจกรรมนี้สำหรับผู้ใช้ระดับ Junior เท่านั้น')
      } else if (message === 'This code is only for senior role') {
        throw new Error('รหัสกิจกรรมนี้สำหรับผู้ใช้ระดับ Senior เท่านั้น')
      } else {
        throw new Error('เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง')
      }
  }
}

export interface GenerateActivityInterface {
  id: number
  codeString: string
  targetRole: string
  activityName: string
  rewardCoin: number
  createdByUserId: string
  expiresAt: string
  createdAt: string
}

export interface GenerateActivityResponse {
  success: boolean
  data: GenerateActivityInterface
}

export const generateActivityCode = async ({
  targetRole,
  activityName,
  rewardCoin,
  expiresAt
}: {
  targetRole: string,
  activityName: string,
  rewardCoin: number,
  expiresAt: string
}): Promise<GenerateActivityInterface> => {
  try {
    const response = await Axios.post<GenerateActivityResponse>(`${BASE_URL}/generate`, {
      targetRole,
      activityName,
      rewardCoin,
      expiresAt
    });
    return response.data.data
  } catch (error: any) {
    const status = error.response?.status;
    if (status === 400) throw new Error('Missing required fields');
    if (status === 401) throw new Error('Authentication required');
    if (status === 403) throw new Error('Insufficient Permission');
    if (status === 503) throw new Error('System disabled for your role');
    throw new Error('Unexpected error during activity code generation');
  }
}

export interface CodeHistoryInterface {
  id: number,
  code_string: string,
  target_role: string,
  activity_name: string,
  reward_coin: number,
  created_by_user_id: string,
  expires_at: string,
  created_at: string
}

export interface CodeHistoryResponse {
  success: boolean
  data: CodeHistoryInterface[]
}

export const getCodeHistory = async (): Promise<CodeHistoryInterface[]> => {
  try {
    const response = await Axios.get<CodeHistoryResponse>(`${BASE_URL}/history`);
    return response.data.data;
  } catch (error: any) {
    const status = error.response?.status;
    if (status === 401) throw new Error('Authentication required');
    if (status === 403) throw new Error('Insufficient Permission');
    throw new Error('Unexpected error during fetching code history');
  }
}