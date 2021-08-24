import { createAction } from 'typesafe-actions';

import { Room } from '@room/types';

export const UPDATE_ROOM_LOADING = 'room/UPDATE_LOADING';
export const UPDATE_ROOM_ERROR = 'room/UPDATE_ERROR';
export const GET_ROOM = 'room/GET_ROOM';
export const UPDATE_ROOM = 'room/UPDATE_ROOM';
export const ENTER_ROOM = 'room/ENTER_ROOM';
export const LEAVE_ROOM = 'room/LEAVE_ROOM';
export const REMOVE_ROOM = 'room/REMOVE_ROOM';

export const updateRoomLoading = createAction(UPDATE_ROOM_LOADING)();
export const updateRoomError = createAction(UPDATE_ROOM_ERROR)<string>();
export const getRoom = createAction(GET_ROOM)<Room>();
export const updateRoom = createAction(UPDATE_ROOM)<Room>();
export const enterRoom = createAction(ENTER_ROOM)<Room>();
export const leaveRoom = createAction(LEAVE_ROOM)<Room>();
export const removeRoom = createAction(REMOVE_ROOM)();
