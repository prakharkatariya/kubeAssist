import * as config from '@/config/config';
import axiosInstance from '@utils/axiosInstance';

export class ChatApi {
  submitNewMessage = async (requestBody: any) => {
    try {
      const response: any = await axiosInstance.post(config.CHAT_STREAM_ENDPOINT, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        responseType: 'stream',
        adapter: 'fetch',
      });

      return response.data;
    } catch (error: any) {
      if (error?.response?.data?.detail !== undefined) {
        throw error?.response?.data?.detail;
      } else if (error?.message !== undefined) {
        throw error.message;
      }
    }
  };
}
