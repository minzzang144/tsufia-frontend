import { ActionType } from 'typesafe-actions';

import * as Rooms from '@rooms/actions';

export type RoomsAction = ActionType<typeof Rooms>;

enum Status {
  대기중,
  진행중,
}

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  photo: string;
  room: Room;
  roomId: number;
  host: boolean;
};

export type Room = {
  id: number;
  title: string;
  currentHeadCount: string;
  totalHeadCount: string;
  status: Status;
  userList: User[];
};

export type RoomsState = {
  loading: boolean;
  error?: string;
  data?: Room[];
};
