import { GET_ROOMS, UPDATE_ROOMS_ERROR, UPDATE_ROOMS_LOADING } from '@rooms/actions';
import { RoomsAction, RoomsState } from '@rooms/types';
import { createReducer } from 'typesafe-actions';

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
});

export default rooms;
