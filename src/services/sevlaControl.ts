import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://sevla-api.up.railway.app";
const API_KEY =
  "c6106e6fcee25d7eff907b4ffb79bf65b5fe5d24db955c0b4ff530eb035913d8";

interface ResponseData {
  success: boolean;
  message?: string;
  data?: unknown;
}

interface RegisterAnalyticsPayload {
  path: string;
  apiKey: string;
}

interface MessagePayload {
  senderName: string;
  senderEmail: string;
  subject: string;
  content: string;
  apiKey: string;
}

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message || error.message || "Erro desconhecido"
    );
  }
  return String(error);
};

export const sevlaControl = {
  registerAnalytics: async (): Promise<ResponseData | void> => {
    const payload: RegisterAnalyticsPayload = {
      path: window.location.pathname,
      apiKey: API_KEY,
    };

    try {
      const response = await api.post<ResponseData>("analytics", payload);
      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      throw new Error(errorMessage);
    }
  },

  registerMessage: async (
    messageData: MessagePayload
  ): Promise<ResponseData | void> => {
    try {
      const response = await api.post<ResponseData>("message", messageData);
      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      throw new Error(errorMessage);
    }
  },
};
