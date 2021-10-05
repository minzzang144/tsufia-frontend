import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import {
  UPDATE_LOADING,
  UPDATE_LOGIN_ERROR,
  UPDATE_SIGNUP_ERROR,
  UPDATE_VALIDATE_PASSWORD_ERROR,
  UPDATE_PROFILE_UPDATE_ERROR,
  UPDATE_TOKEN,
  GET_USER,
} from '@auth/actions';
import { AuthAction, AuthState } from '@auth/types';

const initialState = {
  loading: false,
  error: {
    loginError: undefined,
    signUpError: undefined,
    validatePasswordError: undefined,
    profileUpdateError: undefined,
  },
  token: undefined,
  user: undefined,
};

const authentication = createReducer<AuthState, AuthAction>(initialState, {
  [UPDATE_LOADING]: (state) => ({
    ...state,
    loading: !state.loading,
  }),
  [UPDATE_LOGIN_ERROR]: (state, action) => ({
    ...state,
    error: {
      ...state.error,
      loginError: action.payload,
    },
  }),
  [UPDATE_SIGNUP_ERROR]: (state, action) => ({
    ...state,
    error: {
      ...state.error,
      signUpError: action.payload,
    },
  }),
  [UPDATE_VALIDATE_PASSWORD_ERROR]: (state, action) => ({
    ...state,
    error: {
      ...state.error,
      validatePasswordError: action.payload,
    },
  }),
  [UPDATE_PROFILE_UPDATE_ERROR]: (state, action) => ({
    ...state,
    error: {
      ...state.error,
      profileUpdateError: action.payload,
    },
  }),
  [UPDATE_TOKEN]: (state, action) => ({
    ...state,
    token: action.payload,
  }),
  [GET_USER]: (state, action) =>
    produce(state, (draft) => {
      draft.user = action.payload;
    }),
});

export default authentication;
