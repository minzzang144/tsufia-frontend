import { createAction } from 'typesafe-actions';

import { Room } from '@rooms/types';

export const UPDATE_ROOMS_LOADING = 'rooms/UPDATE_ROOMS_LOADING';
export const UPDATE_ROOMS_ERROR = 'rooms/UPDATE_ROOMS_ERROR';
export const GET_ROOMS = 'rooms/GET_ROOMS';
export const ADD_ROOMS = 'rooms/ADD_ROOMS';
export const UPDATE_ROOMS = 'rooms/UPDATE_ROOMS';
export const ENTER_ROOMS = 'rooms/ENTER_ROOMS';
export const LEAVE_ROOMS = 'rooms/LEAVE_ROOMS';
export const REMOVE_ROOMS = 'rooms/REMOVE_ROOMS';

export const updateRoomsLoading = createAction(UPDATE_ROOMS_LOADING)();
export const updateRoomsError = createAction(UPDATE_ROOMS_ERROR)<string | undefined>();
export const getRooms = createAction(GET_ROOMS)<Room[]>();
export const addRooms = createAction(ADD_ROOMS)<Room>();
export const updateRooms = createAction(UPDATE_ROOMS)<Room>();
export const enterRooms = createAction(ENTER_ROOMS)<Room>();
export const leaveRooms = createAction(LEAVE_ROOMS)<Room>();
export const removeRooms = createAction(REMOVE_ROOMS)<number>();
