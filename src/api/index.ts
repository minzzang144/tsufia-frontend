import axios, { AxiosInstance, AxiosResponse } from 'axios';

import {
  CreateRoomRequest,
  CreateRoomResponse,
  GetRoomRequest,
  GetRoomResponse,
  GetRoomsResponse,
  GoogleLoginRequest,
  GoogleLoginResponse,
  KakaoLoginRequest,
  KakaoLoginResponse,
  LoginResponse,
  SignUpResponse,
  SilentRefreshResponse,
} from '@api-types';
import { LoginFormInput, SignUpFormInput } from '@atoms/Input';

const SERVER_ADDRESS = 'http://localhost:4000/';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  withCredentials: true,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: async (url: string) => await axiosInstance.get(url).then(responseBody),
  post: async (url: string, body?: any) => {
    if (body) {
      return await axiosInstance.post(url, body).then(responseBody);
    } else {
      return await axiosInstance.post(url).then(responseBody);
    }
  },
  put: async (url: string, body: any) => {
    if (body) {
      return await axiosInstance.put(url, body).then(responseBody);
    } else {
      return await axiosInstance.put(url).then(responseBody);
    }
  },
  delete: async (url: string) => await axiosInstance.delete(url).then(responseBody),
};

export const AuthAPI = {
  login: (body: LoginFormInput): Promise<LoginResponse> => requests.post('auth/login', body),
  silentRefresh: (): Promise<SilentRefreshResponse> => requests.post('auth/silent-refresh'),
  signUp: (body: SignUpFormInput): Promise<SignUpResponse> => requests.post('users/sign-up', body),
  googleLogin: (body: GoogleLoginRequest): Promise<GoogleLoginResponse> =>
    requests.post('google', body),
  kakaoLogin: (body: KakaoLoginRequest): Promise<KakaoLoginResponse> =>
    requests.post('kakao', body),
};

export const RoomAPI = {
  getRooms: (): Promise<GetRoomsResponse> => requests.get('rooms'),
  getRoom: (body: GetRoomRequest): Promise<GetRoomResponse> => requests.get(`rooms/${body.roomId}`),
  createRoom: (body: CreateRoomRequest): Promise<CreateRoomResponse> =>
    requests.post('rooms/create', body),
};
