import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import { GET_USER, UPDATE_ERROR, UPDATE_LOADING, UPDATE_TOKEN } from '@auth/actions';
import { AuthAction, AuthState } from '@auth/types';

const initialState = {
  loading: false,
  error: undefined,
  token: undefined,
  user: undefined,
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
  [GET_USER]: (state, action) =>
    produce(state, (draft) => {
      draft.user = action.payload;
    }),
});

export default authentication;
