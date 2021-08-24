import { User } from '@auth';
import { Room } from '@rooms';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface CommonResponse {
  ok: boolean;
  error?: string;
}

/* Auth API */
// Login
export interface LoginResponse extends CommonResponse {
  accessToken?: string;
}

// Silent Refresh
export interface SilentRefreshResponse extends CommonResponse {
  accessToken?: string;
}

// Sign Up
export interface SignUpResponse extends CommonResponse {}

// Google Login
export interface GoogleLoginRequest {
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
}

export interface GoogleLoginResponse extends CommonResponse {
  accessToken?: string;
}

// Kakao Login
export interface KakaoLoginRequest {
  email: string;
  nickname: string;
  photo: string;
}

export interface KakaoLoginResponse extends CommonResponse {
  accessToken?: string;
}

export interface GetUserResponse extends CommonResponse {
  user?: User;
}

/* Room API */
// Get Rooms
export interface GetRoomsResponse extends CommonResponse {
  rooms?: Room[];
}

export interface CreateRoomRequest {
  title: string;
  totalHeadCount: number;
}

// Get Room
export interface GetRoomRequest {
  roomId: string;
}

export interface GetRoomResponse extends CommonResponse {
  room?: Room;
}

// Create Room
export interface CreateRoomResponse extends CommonResponse {
  room?: Room;
}

// Update Room
export interface UpdateRoomRequest {
  title: string;
  totalHeadCount: number;
}

export interface UpdateRoomResponse extends CommonResponse {
  room?: Room;
}

// Enter Room
export interface EnterRoomRequest {
  roomId: string;
}

export interface EnterRoomResponse extends CommonResponse {
  room?: Room;
}
