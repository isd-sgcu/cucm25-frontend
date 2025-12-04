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
