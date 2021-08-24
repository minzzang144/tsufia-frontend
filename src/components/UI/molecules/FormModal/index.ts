import { ICreateRoomFormContext } from '@pages/LoginHome/LoginHomeContainer';
import { IUpdateRoomFormContext } from '@pages/RoomPage';

export interface FormModalProps {
  roomFormContext: ICreateRoomFormContext | IUpdateRoomFormContext;
  title: string;
  defaultValue: string;
  disabled: string;
}
