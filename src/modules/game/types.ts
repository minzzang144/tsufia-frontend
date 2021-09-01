import { ActionType } from 'typesafe-actions';

import * as gameAction from '@game/actions';

export type GameAction = ActionType<typeof gameAction>;

export enum Circle {
  밤,
  낮,
  저녁,
}

export type Game = {
  id: number;
  userId: number;
  roomId: number;
  circle: Circle | null;
  countDown: number;
};

export type GameState = {
  loading: boolean;
  error?: string;
  data?: Game;
};
