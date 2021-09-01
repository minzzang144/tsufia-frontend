import { User } from '@auth';
import { Chat } from '@chats/types';
import { Game } from '@game';
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

// Leave Room
export interface LeaveRoomRequest {
  roomId: string;
}

export interface LeaveRoomResponse extends CommonResponse {
  room?: Room;
}

// Remove Room
export interface RemoveRoomResponse extends CommonResponse {
  roomId: number;
}

/* Chat API */
// Get Chats
export interface GetChatsResponse extends CommonResponse {
  chats: Chat[];
}

// Create Chats
export interface CreateChatsRequest {
  content: string;
}

export interface CreateChatsResponse extends CommonResponse {
  chat?: Chat;
}

/* Game API */
// Create Game
export interface CreateGameResponse extends CommonResponse {
  game?: Game;
}
