import { combineReducers } from 'redux';

import authentication from '@/modules/auth';

const rootReducer = combineReducers({
  authentication,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
