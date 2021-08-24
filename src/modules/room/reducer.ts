import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import {
  ENTER_ROOM,
  GET_ROOM,
  LEAVE_ROOM,
  REMOVE_ROOM,
  UPDATE_ROOM,
  UPDATE_ROOM_ERROR,
  UPDATE_ROOM_LOADING,
} from '@room/actions';
import { RoomAction, RoomState } from '@room/types';

const initialState = {
  loading: false,
  error: undefined,
  data: undefined,
};

const room = createReducer<RoomState, RoomAction>(initialState, {
  [UPDATE_ROOM_LOADING]: (state) => ({
    ...state,
    loading: !state.loading,
  }),
  [UPDATE_ROOM_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [GET_ROOM]: (state, action) => ({
    ...state,
    data: action.payload,
  }),
  [UPDATE_ROOM]: (state, action) => ({
    ...state,
    data: action.payload,
  }),
  [ENTER_ROOM]: (state, action) =>
    produce(state, (draft) => {
      draft.data = action.payload;
    }),
  [LEAVE_ROOM]: (state, action) =>
    produce(state, (draft) => {
      draft.data = action.payload;
    }),
  [REMOVE_ROOM]: (state) => ({
    ...state,
    data: undefined,
  }),
});

export default room;
