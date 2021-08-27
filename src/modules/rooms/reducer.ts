import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import {
  ADD_ROOMS,
  ENTER_ROOMS,
  GET_ROOMS,
  LEAVE_ROOMS,
  REMOVE_ROOMS,
  RESET_ROOMS,
  UPDATE_ROOMS,
  UPDATE_ROOMS_ERROR,
  UPDATE_ROOMS_LOADING,
} from '@rooms/actions';
import { RoomsAction, RoomsState } from '@rooms/types';

const initialState = {
  loading: false,
  error: undefined,
  data: undefined,
};

const rooms = createReducer<RoomsState, RoomsAction>(initialState, {
  [UPDATE_ROOMS_LOADING]: (state) => ({
    ...state,
    loading: !state.loading,
  }),
  [UPDATE_ROOMS_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [GET_ROOMS]: (state, action) => ({
    ...state,
    data: action.payload,
  }),
  [ADD_ROOMS]: (state, action) => ({
    ...state,
    data: state.data?.concat(action.payload),
  }),
  [UPDATE_ROOMS]: (state, action) =>
    produce(state, (draft) => {
      const index = state.data?.findIndex((value) => value.id === action.payload.id);
      if (index !== undefined && index !== -1) {
        draft.data?.splice(index, 1, action.payload);
      }
    }),
  [ENTER_ROOMS]: (state, action) =>
    produce(state, (draft) => {
      const index = state.data?.findIndex((value) => value.id === action.payload.id);
      if (index !== undefined && index !== -1) {
        draft.data?.splice(index, 1, action.payload);
      }
    }),
  [LEAVE_ROOMS]: (state, action) =>
    produce(state, (draft) => {
      const index = state.data?.findIndex((value) => value.id === action.payload.id);
      if (index !== undefined && index !== -1) {
        draft.data?.splice(index, 1, action.payload);
      }
    }),
  [REMOVE_ROOMS]: (state, action) =>
    produce(state, (draft) => {
      const index = state.data?.findIndex((value) => value.id === action.payload);
      if (index !== undefined && index !== -1) {
        draft.data?.splice(index, 1);
      }
    }),
  [RESET_ROOMS]: (state) => ({
    ...state,
    data: undefined,
  }),
});

export default rooms;
