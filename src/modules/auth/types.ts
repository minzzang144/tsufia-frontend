import { ActionType } from 'typesafe-actions/dist/type-helpers';

import * as Auth from '@auth/actions';

export type AuthAction = ActionType<typeof Auth>;

enum Provider {
  Local,
  Google,
  Kakao,
}

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  photo: string;
  provider: Provider;
  refreshToken: string;
  roomId: number;
  host: boolean;
};

export type AuthState = {
  loading: boolean;
  error: string | undefined;
  token: string | undefined;
  user?: User;
};
