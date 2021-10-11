import { ILoginContext, ISignUpContext } from '@pages/LogoutHome/LogoutHomeContainer';
import { IProfileUpdateContext } from '@pages/ProfileUpdatePage';
import { IUpdateRoomFormContext } from '@pages/RoomPage';
import { IValidateContext } from '@pages/ValidatePage';
import { ICreateRoomFormContext } from '@routers/LoginRouter';

export interface FormContainerProps {
  where: 'login' | 'sign-up' | 'validate-password' | 'profile-update';
  context: ISignUpContext | ILoginContext | IValidateContext | IProfileUpdateContext;
  modalContext?: ICreateRoomFormContext | IUpdateRoomFormContext;
}
