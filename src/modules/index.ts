import { combineReducers } from 'redux';

import authentication from '@auth/reducer';

const rootReducer = combineReducers({
  authentication,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
