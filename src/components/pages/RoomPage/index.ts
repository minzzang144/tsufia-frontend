import {
  Control,
  DeepMap,
  FieldError,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

import { User } from '@auth';
import { Cycle } from '@game';
import { RoomPageContainer } from '@pages/RoomPage/RoomPageContainer';

export default RoomPageContainer;

// Update Room Context Interface
export interface IUpdateRoomFormContext {
  register: UseFormRegister<UpdateRoomFormInput>;
  handleSubmit: UseFormHandleSubmit<UpdateRoomFormInput>;
  control: Control<UpdateRoomFormInput>;
  onValid: () => void;
  errors: DeepMap<UpdateRoomFormInput, FieldError>;
  isValid: boolean;
  toggleModal: boolean;
  onToggleModal: () => void;
}

// Update Room Form Input Interface
export interface UpdateRoomFormInput {
  title: string;
  totalHeadCount: string;
}

// Chat Form Context Interface
export interface IChatFormContext {
  register: UseFormRegister<ChatFormInput>;
  handleSubmit: UseFormHandleSubmit<ChatFormInput>;
  control: Control<ChatFormInput>;
  onValid: () => void;
  errors: DeepMap<ChatFormInput, FieldError>;
  isValid: boolean;
}

// Update Room Form Input Interface
export interface ChatFormInput {
  content: string;
}

// Room Page Context Interface
export interface IRoomPageContext {
  selfUserInRoom: User | undefined;
  onLeaveRoomListClick: () => void;
  countDown: number;
  onUserListClick: (userId: number, cycle: Cycle | null) => void;
  selectCitizenId: number | undefined;
  selectUserId: number | undefined;
  mafiaCount: number;
  citizenCount: number;
}
