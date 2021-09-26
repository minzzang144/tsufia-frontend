import { ActionType } from 'typesafe-actions';

import * as RA from '@room/actions';

import { User } from '@auth';
import { Game } from '@game';

export type RoomAction = ActionType<typeof RA>;

export enum Status {
  대기중,
  진행중,
  완료,
}

export type Room = {
  id: number;
  title: string;
  currentHeadCount: number;
  totalHeadCount: number;
  status: Status;
  userList: User[];
  game: Game;
};

export type RoomState = {
  loading: boolean;
  error?: string;
  data?: Room;
};
