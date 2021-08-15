import { createReducer } from 'typesafe-actions';

import { UPDATE_ERROR, UPDATE_LOADING, UPDATE_TOKEN } from '@auth/actions';
import { AuthAction, AuthState } from '@auth/types';

const initialState = {
  loading: false,
  error: undefined,
  token: undefined,
};

const authentication = createReducer<AuthState, AuthAction>(initialState, {
  [UPDATE_LOADING]: (state) => ({
    ...state,
    loading: !state.loading,
  }),
  [UPDATE_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [UPDATE_TOKEN]: (state, action) => ({
    ...state,
    token: action.payload,
  }),
});

export default authentication;
