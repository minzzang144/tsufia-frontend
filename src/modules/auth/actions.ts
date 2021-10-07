import { createAction } from 'typesafe-actions';

import { User } from '@auth/types';

export const UPDATE_LOADING = 'auth/UPDATE_LOADING';
export const UPDATE_LOGIN_ERROR = 'auth/UPDATE_LOGIN_ERROR';
export const UPDATE_SIGNUP_ERROR = 'auth/UPDATE_SIGNUP_ERROR';
export const UPDATE_VALIDATE_PASSWORD_ERROR = 'auth/UPDATE_VALIDATE_PASSWORD_ERROR';
export const GET_WILL_PATCH_USER_ERROR = 'auth/GET_WILL_PATCH_USER_ERROR';
export const UPDATE_PROFILE_UPDATE_ERROR = 'auth/UPDATE_PROFILE_UPDATE_ERROR';
export const UPDATE_TOKEN = 'auth/UPDATE_TOKEN';
export const GET_USER = 'auth/GET_USER';

export const updateLoading = createAction(UPDATE_LOADING)();
export const updateLoginError = createAction(UPDATE_LOGIN_ERROR)<string | undefined>();
export const updateSignupError = createAction(UPDATE_SIGNUP_ERROR)<string | undefined>();
export const updateValidatePasswordError = createAction(UPDATE_VALIDATE_PASSWORD_ERROR)<
  string | undefined
>();
export const updateProfileUpdateError = createAction(UPDATE_PROFILE_UPDATE_ERROR)<
  string | undefined
>();
export const getWillPatchUserError = createAction(GET_WILL_PATCH_USER_ERROR)<string | undefined>();
export const updateToken = createAction(UPDATE_TOKEN)<string>();
export const getUser = createAction(GET_USER)<User>();
