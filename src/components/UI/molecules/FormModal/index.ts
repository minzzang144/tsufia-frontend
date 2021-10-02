import { IUpdateRoomFormContext } from '@pages/RoomPage/index';
import { ICreateRoomFormContext } from '@routers/LoginRouter';

type DefaultValue = {
  input: string;
  radio: string;
};

export interface FormModalProps {
  formContext: ICreateRoomFormContext | IUpdateRoomFormContext;
  title: string;
  defaultValue: DefaultValue;
}
