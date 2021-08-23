import { combineReducers } from 'redux';

import authentication from '@auth/reducer';
import rooms from '@rooms/reducer';
import room from '@room/reducer';

const rootReducer = combineReducers({
  authentication,
  rooms,
  room,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
