import { createReducer } from 'typesafe-actions';

import {
  CREATE_GAME,
  GET_GAME,
  RESET_GAME,
  UPDATE_GAME_ERROR,
  UPDATE_GAME_LOADING,
} from '@game/actions';
import { GameAction, GameState } from '@game/types';

const initialState = {
  loading: false,
  error: undefined,
  data: undefined,
};

const game = createReducer<GameState, GameAction>(initialState, {
  [UPDATE_GAME_LOADING]: (state) => ({
    ...state,
    loading: !state.loading,
  }),
  [UPDATE_GAME_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [CREATE_GAME]: (state, action) => ({
    ...state,
    data: action.payload,
  }),
  [GET_GAME]: (state, action) => ({
    ...state,
    data: action.payload,
  }),
  [RESET_GAME]: (state) => ({
    ...state,
    data: undefined,
  }),
});

export default game;
