import { ActionType } from 'typesafe-actions';

import * as Rooms from '@rooms/actions';

import { User } from '@auth';

export type RoomsAction = ActionType<typeof Rooms>;

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

export type RoomsState = {
  loading: boolean;
  error?: string;
  data?: Room[];
};
