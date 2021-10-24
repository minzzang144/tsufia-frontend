/* eslint-disable @typescript-eslint/no-empty-interface */
import { User } from '@auth';
import { Chat } from '@chats/types';
import { Game } from '@game';
import { Room } from '@rooms';

export interface CommonResponse {
  ok: boolean;
  error?: string;
}

/**
 * Auth API
 */
// Login
export interface LoginResponse extends CommonResponse {
  accessToken?: string;
}

// Logout
export interface LogoutResponse extends CommonResponse {}

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

// Get User Profile
export interface GetUserResponse extends CommonResponse {
  user?: User;
}

// Validate Password
export interface PostUserPasswordRequest {
  userId: number;
  password: string;
}

export interface PostUserPasswordResonse extends CommonResponse {}

// Get Will Patch User
export interface GetWillPatchUserRequest {
  userId: string;
}

export interface GetWillPatchUserResponse extends CommonResponse {}

// Patch User
export interface PatchUserRequest {
  userId: number;
  firstName: string;
  lastName: string;
  password: string;
  checkPassword: string;
}

export interface PatchUserResponse extends CommonResponse {
  user?: User;
}

/**
 * Room API
 */
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

// Create UserRole from Room
export interface CreateUserRoleRequest {
  roomId: number;
}

export interface CreateUserRoleResponse extends CommonResponse {
  room?: Room;
}

// Patch Survive in Game UserList
export interface PatchSurviveRequest {
  roomId: number;
  selectId: number;
}

export interface PatchSurviveResponse extends CommonResponse {
  room?: Room;
}

export interface PatchRestartRoomGameRequest {
  roomId: number;
}

export interface PatchRestartRoomGameResponse extends CommonResponse {
  room?: Room;
}

/**
 * Chat API
 */
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

/**
 * Game API
 */

// Create Game
export interface CreateGameResponse extends CommonResponse {
  game?: Game;
}

// Patch Game
export interface PatchGameRequest {
  id: string;
}

export interface PatchGameResponse extends CommonResponse {
  game?: Game;
}

/**
 * Mail API
 *  */

// Post Contact User
export interface PostContactUserRequest {
  email: string;
  subject: string;
  message: string;
}

export interface PostContactUserResponse extends CommonResponse {}
