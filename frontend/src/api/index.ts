import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import env from 'react-dotenv';

import { JwtTokens } from "../@types/models/token.model";

const $api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3005/api'
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;

  return config;
});

$api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<AxiosResponse> => {
    const originalRequest = error.config;
    if (!originalRequest.headers) {
      originalRequest.headers = {};
    }

    if (error.response?.status === 401 && !originalRequest.headers._isRetry) {
      // console.log('refresh');
      originalRequest.headers._isRetry = true;
      try {
        const response = await axios.get<JwtTokens>('http://localhost:3005/api/auth/refresh', { withCredentials: true,  });
        localStorage.setItem('accessToken', response.data.accessToken);
        return $api.request(originalRequest);
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 429) {
          return $api.request(originalRequest);
        }
      }
    }
    throw error;
  }
)

export default $api;