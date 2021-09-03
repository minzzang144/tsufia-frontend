import { createAction } from 'typesafe-actions';

import { Game } from '@game/types';

export const UPDATE_GAME_LOADING = 'game/UPDATE_GAME_LOADING';
export const UPDATE_GAME_ERROR = 'game/UPDATE_GAME_ERROR';
export const CREATE_GAME = 'game/CREATE_GAME';
export const GET_GAME = 'game/GET_GAME';

export const updateGameLoading = createAction(UPDATE_GAME_LOADING)();
export const updateGameError = createAction(UPDATE_GAME_ERROR)<string>();
export const createGame = createAction(CREATE_GAME)<Game>();
export const getGame = createAction(GET_GAME)<Game>();
