/* eslint-disable @typescript-eslint/no-empty-interface */
export interface CommonResponse {
  ok: boolean;
  error?: string;
}

export interface LoginResponse extends CommonResponse {
  accessToken?: string;
}

export interface SilentRefreshResponse extends CommonResponse {
  accessToken?: string;
}

export interface SignUpResponse extends CommonResponse {}

export interface GoogleLoginRequest {
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
}

export interface GoogleLoginResponse extends CommonResponse {
  accessToken?: string;
}
