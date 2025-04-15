import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://sevla-backend-production.up.railway.app";
const API_KEY =
  "c71bfc1c48e90de4992b4d874e56fdf2539711b98862e0994825361ca2338f16";

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
  registerVisit: async () => {
    try {
      const response = await api.post<ResponseData>("visits", {
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
