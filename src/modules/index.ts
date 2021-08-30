import { combineReducers } from 'redux';

import authentication from '@auth/reducer';
import chats from '@chats/reducer';
import rooms from '@rooms/reducer';
import room from '@room/reducer';

const rootReducer = combineReducers({
  authentication,
  rooms,
  room,
  chats,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
