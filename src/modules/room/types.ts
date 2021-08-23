import { ActionType } from 'typesafe-actions';

import * as RA from '@room/actions';

export type RoomAction = ActionType<typeof RA>;

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
