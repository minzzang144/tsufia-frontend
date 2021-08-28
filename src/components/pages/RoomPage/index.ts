import {
  Control,
  DeepMap,
  FieldError,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

import { User } from '@auth';
import { RoomPageContainer } from '@pages/RoomPage/RoomPageContainer';

export default RoomPageContainer;

// Create Room Context Interface
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

// Create Room Form Input Interface
export interface UpdateRoomFormInput {
  title: string;
  totalHeadCount: string;
}

// Room Page Context Interface
export interface IRoomPageContext {
  selfUserInRoom: User | undefined;
  onLeaveRoomListClick: () => void;
}
