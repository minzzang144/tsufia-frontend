import { ActionType } from 'typesafe-actions/dist/type-helpers';

import * as Auth from '@auth/actions';

export type AuthAction = ActionType<typeof Auth>;

export type AuthState = {
  loading: boolean;
  error: string | undefined;
  token: string | undefined;
};
