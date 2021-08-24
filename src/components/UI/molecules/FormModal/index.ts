import { ICreateRoomFormContext } from '@pages/LoginHome/LoginHomeContainer';
import { IUpdateRoomFormContext } from '@pages/RoomPage/index';

type DefaultValue = {
  input: string;
  radio: string;
};

export interface FormModalProps {
  roomFormContext: ICreateRoomFormContext | IUpdateRoomFormContext;
  title: string;
  defaultValue: DefaultValue;
}
