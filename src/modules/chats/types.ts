import { ActionType } from 'typesafe-actions';

import * as chatsAction from '@chats/actions';

import { User } from '@auth';
import { Room } from '@rooms';

export type ChatsAction = ActionType<typeof chatsAction>;

export type Chat = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  room: Room;
  user: User;
};

export type ChatsState = {
  loading: boolean;
  error?: string;
  data?: Chat[];
};
