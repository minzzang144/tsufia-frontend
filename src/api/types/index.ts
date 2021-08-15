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
