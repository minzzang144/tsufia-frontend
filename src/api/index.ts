import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { LoginResponse } from '@api-types';
import { LoginFormInput } from '@atoms/Input';

const SERVER_ADDRESS = 'http://localhost:4000/';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  withCredentials: true,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axiosInstance.get(url).then(responseBody),
  post: (url: string, body: any) => axiosInstance.post(url, body).then(responseBody),
  put: (url: string, body: any) => axiosInstance.put(url, body).then(responseBody),
  delete: (url: string) => axiosInstance.delete(url).then(responseBody),
};

export const AuthAPI = {
  login: (body: LoginFormInput): Promise<LoginResponse> => requests.post('auth/login', body),
};
