import { createReducer } from 'typesafe-actions';

import { GET_CHATS, UPDATE_CHATS_ERROR, UPDATE_CHATS_LOADING } from '@chats/actions';
import { ChatsAction, ChatsState } from '@chats/types';

const initialState = {
  loading: false,
  error: undefined,
  data: undefined,
};

const chats = createReducer<ChatsState, ChatsAction>(initialState, {
  [UPDATE_CHATS_LOADING]: (state) => ({
    ...state,
    loading: !state.loading,
  }),
  [UPDATE_CHATS_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [GET_CHATS]: (state, action) => ({
    ...state,
    data: action.payload,
  }),
});

export default chats;
