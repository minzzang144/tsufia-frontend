import { createAction } from 'typesafe-actions';

import { Chat } from '@/modules/chats/types';

export const UPDATE_CHATS_LOADING = 'chats/UPDATE_CHATS_LOADING';
export const UPDATE_CHATS_ERROR = 'chats/UPDATE_CHATS_ERROR';
export const GET_CHATS = 'chats/GET_CHATS';
export const CREATE_CHATS = 'chats/CREATE_CHATS';
export const RESET_CHATS = 'chats/RESET_CHATS';

export const updateChatsLoading = createAction(UPDATE_CHATS_LOADING)();
export const updateChatsError = createAction(UPDATE_CHATS_ERROR)<string | undefined>();
export const getChats = createAction(GET_CHATS)<Chat[]>();
export const createChats = createAction(CREATE_CHATS)<Chat>();
export const resetChats = createAction(RESET_CHATS)();
