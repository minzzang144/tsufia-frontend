import { createAction } from 'typesafe-actions';

import { Room } from '@rooms/types';

export const UPDATE_ROOMS_LOADING = 'rooms/UPDATE_ROOMS_LOADING';
export const UPDATE_ROOMS_ERROR = 'rooms/UPDATE_ROOMS_ERROR';
export const GET_ROOMS = 'rooms/GET_ROOMS';
export const ADD_ROOM = 'rooms/ADD_ROOM';
export const UPDATE_ROOMS = 'rooms/UPDATE_ROOMS';

export const updateRoomsLoading = createAction(UPDATE_ROOMS_LOADING)();
export const updateRoomsError = createAction(UPDATE_ROOMS_ERROR)<string | undefined>();
export const getRooms = createAction(GET_ROOMS)<Room[]>();
export const addRoom = createAction(ADD_ROOM)<Room>();
export const updateRooms = createAction(UPDATE_ROOMS)<Room>();
