import axios, { AxiosInstance, AxiosResponse } from 'axios';

import {
  CreateChatsRequest,
  CreateChatsResponse,
  CreateGameResponse,
  CreateRoomRequest,
  CreateRoomResponse,
  CreateUserRoleRequest,
  CreateUserRoleResponse,
  EnterRoomRequest,
  EnterRoomResponse,
  GetChatsResponse,
  GetRoomRequest,
  GetRoomResponse,
  GetRoomsResponse,
  GetUserResponse,
  GetWillPatchUserRequest,
  GetWillPatchUserResponse,
  GoogleLoginRequest,
  GoogleLoginResponse,
  KakaoLoginRequest,
  KakaoLoginResponse,
  LeaveRoomRequest,
  LeaveRoomResponse,
  LoginResponse,
  LogoutResponse,
  PatchGameRequest,
  PatchGameResponse,
  PatchRestartRoomGameRequest,
  PatchRestartRoomGameResponse,
  PatchSurviveRequest,
  PatchSurviveResponse,
  PatchUserRequest,
  PatchUserResponse,
  PostContactUserRequest,
  PostContactUserResponse,
  PostUserPasswordRequest,
  PostUserPasswordResonse,
  RemoveRoomResponse,
  SignUpResponse,
  SilentRefreshResponse,
  UpdateRoomRequest,
  UpdateRoomResponse,
} from '@api-types';
import { LoginFormInput, SignUpFormInput } from '@atoms/Input';

const SERVER_ADDRESS =
  process.env.NODE_ENV === 'production'
    ? 'https://tsufia-backend.herokuapp.com/'
    : 'http://localhost:4000/';

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
  put: async (url: string, body?: any) => {
    if (body) {
      return await axiosInstance.put(url, body).then(responseBody);
    } else {
      return await axiosInstance.put(url).then(responseBody);
    }
  },
  patch: async (url: string, body?: any) => {
    if (body) {
      return await axiosInstance.patch(url, body).then(responseBody);
    } else {
      return await axiosInstance.patch(url).then(responseBody);
    }
  },
  delete: async (url: string) => await axiosInstance.delete(url).then(responseBody),
};

export const AuthAPI = {
  login: (body: LoginFormInput): Promise<LoginResponse> => requests.post('auth/login', body),
  logout: (): Promise<LogoutResponse> => requests.post('auth/logout'),
  silentRefresh: (): Promise<SilentRefreshResponse> => requests.post('auth/silent-refresh'),
  signUp: (body: SignUpFormInput): Promise<SignUpResponse> => requests.post('users/sign-up', body),
  googleLogin: (body: GoogleLoginRequest): Promise<GoogleLoginResponse> =>
    requests.post('google', body),
  kakaoLogin: (body: KakaoLoginRequest): Promise<KakaoLoginResponse> =>
    requests.post('kakao', body),
  getUser: (): Promise<GetUserResponse> => requests.get('users/profile'),
  getWillPatchUser: (body: GetWillPatchUserRequest): Promise<GetWillPatchUserResponse> =>
    requests.get(`users/${body.userId}/profile-update`),
  postUserPassword: (body: PostUserPasswordRequest): Promise<PostUserPasswordResonse> =>
    requests.post(`users/${body.userId}/validate-password`, { password: body.password }),
  patchUser: (body: PatchUserRequest): Promise<PatchUserResponse> =>
    requests.patch(`users/${body.userId}/profile-update`, { ...body, userId: undefined }),
};

export const RoomAPI = {
  getRooms: (): Promise<GetRoomsResponse> => requests.get('rooms'),
  getRoom: (body: GetRoomRequest): Promise<GetRoomResponse> => requests.get(`rooms/${body.roomId}`),
  createRoom: (body: CreateRoomRequest): Promise<CreateRoomResponse> =>
    requests.post('rooms/create', body),
  updateRoom: (body: UpdateRoomRequest): Promise<UpdateRoomResponse> =>
    requests.patch('rooms/update', body),
  enterRoom: (body: EnterRoomRequest): Promise<EnterRoomResponse> =>
    requests.patch(`api/rooms/${body.roomId}/enter`),
  leaveRoom: (body: LeaveRoomRequest): Promise<LeaveRoomResponse> =>
    requests.patch(`api/rooms/${body.roomId}/leave`),
  removeRoom: (): Promise<RemoveRoomResponse> => requests.delete(`rooms/delete`),
  createUserRole: (body: CreateUserRoleRequest): Promise<CreateUserRoleResponse> =>
    requests.patch(`api/rooms/${body.roomId}/create/user-role`),
  patchSurvive: (body: PatchSurviveRequest): Promise<PatchSurviveResponse> =>
    requests.patch(`api/rooms/${body.roomId}/patch/survive`, { selectId: body.selectId }),
  patchRestart: (body: PatchRestartRoomGameRequest): Promise<PatchRestartRoomGameResponse> =>
    requests.patch(`api/rooms/${body.roomId}/patch/restart`),
};

export const ChatAPI = {
  getChats: (): Promise<GetChatsResponse> => requests.get('chats'),
  createChats: (body: CreateChatsRequest): Promise<CreateChatsResponse> =>
    requests.post('chats/create', body),
};

export const GameAPI = {
  createGame: (): Promise<CreateGameResponse> => requests.post('games/create'),
  patchGame: (body: PatchGameRequest): Promise<PatchGameResponse> =>
    requests.patch(`games/${body.id}/update`),
};

export const MailAPI = {
  postContactUser: (body: PostContactUserRequest): Promise<PostContactUserResponse> =>
    requests.post(`mail/contact`, body),
};
