import { ActionType } from 'typesafe-actions';

import * as RA from '@room/actions';

import { User } from '@auth';

export type RoomAction = ActionType<typeof RA>;

enum Status {
  대기중,
  진행중,
}

export type Room = {
  id: number;
  title: string;
  currentHeadCount: number;
  totalHeadCount: number;
  status: Status;
  userList: User[];
};

export type RoomState = {
  loading: boolean;
  error?: string;
  data?: Room;
};
