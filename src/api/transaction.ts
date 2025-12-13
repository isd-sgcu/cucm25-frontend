import Axios from "@/lib/axios";

const BASE_URL = __API_ROOT__ + '/api/transaction';

export interface CoinHistoryInterface {
  correspondentName: string;
  amount: number;
  action: 'sent' | 'received';
  timestamp: Date;
}

export interface CoinHistoryResponse {
  success: boolean;
  data: CoinHistoryInterface[];
}

export const getCoinHistory = async (): Promise<CoinHistoryInterface[]> => {
  try {
    const response = await Axios.get<CoinHistoryResponse>(`${BASE_URL}/history/coins`);
    return response.data.data;
  } catch (error: any) {
    throw new Error('Unexpected error during fetching coin history');
  }
};

export interface GiftHistoryInterface {
  recipientName: string;
  amount: number;
  timestamp: Date;
}

export interface GiftHistoryResponse {
  success: boolean;
  data: GiftHistoryInterface[];
}

export const getGiftHistory = async (): Promise<GiftHistoryInterface[]> => {
  try {
    const response = await Axios.get<GiftHistoryResponse>(`${BASE_URL}/history/gifts`);
    return response.data.data;
  } catch (error: any) {
    throw new Error('Unexpected error during fetching gift history');
  }
};