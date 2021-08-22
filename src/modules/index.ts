import { combineReducers } from 'redux';

import authentication from '@auth/reducer';
import rooms from '@rooms/reducer';

const rootReducer = combineReducers({
  authentication,
  rooms,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
