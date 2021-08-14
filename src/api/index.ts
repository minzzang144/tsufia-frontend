import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { LoginResponse } from '@api-types';
import { LoginFormInput } from '@atoms/Input';

const SERVER_ADDRESS = 'http://localhost:4000/';

const instance: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  withCredentials: true,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: any) => instance.post(url, body).then(responseBody),
  put: (url: string, body: any) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export const Login = {
  login: (body: LoginFormInput): Promise<LoginResponse> => requests.post('auth/login', body),
};
