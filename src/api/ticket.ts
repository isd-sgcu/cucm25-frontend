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

export interface BuyingTicketFormInterface {
  quantity: number
}

export interface BuyingTicketResponse {}

export const buyTicket = async (
  buyingTicketForm: BuyingTicketFormInterface
): Promise<BuyingTicketResponse> => {
  try {
    const response = await Axios.post<BuyingTicketResponse>(`${BASE_URL}/buy`, buyingTicketForm)
    return response.data
  } catch (error: any) {
    throw new Error('Unexpected error during buyTicket: ', error)
  }
}

export interface ExportsNameInterface {
  purchase_id: string,
  event_name: string | null,
  ticket_price: number,
  user_id: string,
  username: string,
  nickname: string,
  fullname: string,
  purchase_at: string
}

export interface ExportsNameResponse {
  success: boolean;
  data: ExportsNameInterface[];
}

export const exportsNameTickets = async ({
  start_time,
  end_time,
  randomize = true
}: {
  start_time: string,
  end_time: string,
  randomize?: boolean
}): Promise<ExportsNameInterface[]> => {
  try {
    const response = await Axios.get<ExportsNameResponse>(`${BASE_URL}/export`, {
      params: { start_time, end_time, randomize }
    })
    return response.data.data
  } catch (error: any) {
    const status = error.response?.status
    if (status === 400) throw new Error('Invalid inputs (negative number, missing dates, etc.)')
    if (status === 404) throw new Error('Event or configuration is missing')
    if (status === 409) throw new Error('Trying to purchase more tickets than available')
    throw new Error('Unexpected error during exportsNameTickets: ' + error)
  }
}
