import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://sevla-backend-production.up.railway.app";
const API_KEY =
  "c6106e6fcee25d7eff907b4ffb79bf65b5fe5d24db955c0b4ff530eb035913d8";

interface ResponseData {
  success: boolean;
  message?: string;
  data?: unknown;
}

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sevlaControl = {
  registerAnalytics: async () => {
    try {
      const response = await api.post<ResponseData>("analytics", {
        path: window.location.pathname,
        apiKey: API_KEY,
      });
      return response;
    } catch (error) {
      const message = axios.isAxiosError(error) ? error.message : String(error);
      console.error("Erro ao registrar visita:", message);
    }
  },
};
