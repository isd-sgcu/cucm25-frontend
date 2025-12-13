import type { AnswerInterface } from '@/interface/question'
import Axios from '@/lib/axios'
import type { EducationLevelType } from '@/utils/const'

const BASE_URL = __API_ROOT__ + '/api/gift'

export interface FormatJuniorSeniorSendingGiftFormProps {
  username: string
  nickname: string
  educationLevel: EducationLevelType | undefined
  questionAnswers: AnswerInterface[]
}

export interface SendingGiftResponse {
  success: boolean
  message: string
}

export const sendingGift = async (
  formatForm: FormatJuniorSeniorSendingGiftFormProps
): Promise<SendingGiftResponse> => {
  try {
    const response = await Axios.post<SendingGiftResponse>(`${BASE_URL}/send`, formatForm)
    return response.data
  } catch (error: any) {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message;
    if (status === 400) {
      if (message.includes('wrong answer')) {
        throw new Error('ตอบคำถามไม่ถูกต้อง กรุณาตอบคำถามใหม่อีกครั้ง')
      } else if (message.includes('already sent')) {
        throw new Error('ไม่สามารถส่งของขวัญให้คนเดิมซ้ำได้')
      } else {
        throw new Error('เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง')
      }
    }
    if (status === 401) throw new Error('Unauthorized to send gift')
    if (status === 404) throw new Error('Recipient not found')
    throw new Error('Unexpected error when sending gift')
  }
}
