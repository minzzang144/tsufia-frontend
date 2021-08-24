import { GET_ROOM, UPDATE_ROOM, UPDATE_ROOM_ERROR, UPDATE_ROOM_LOADING } from '@room/actions';
import { RoomAction, RoomState } from '@room/types';
import { createReducer } from 'typesafe-actions';

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
});

export default room;
