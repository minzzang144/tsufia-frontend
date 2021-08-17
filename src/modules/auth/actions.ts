import { createAction } from 'typesafe-actions';

export const UPDATE_LOADING = 'auth/UPDATE_LOADING';
export const UPDATE_ERROR = 'auth/UPDATE_ERROR';
export const UPDATE_TOKEN = 'auth/UPDATE_TOKEN';

export const updateLoading = createAction(UPDATE_LOADING)();
export const updateError = createAction(UPDATE_ERROR)<string | undefined>();
export const updateToken = createAction(UPDATE_TOKEN)<string>();
