import { ILoginContext } from '@pages/LogoutHome/LogoutHomeContainer';
import { IProfileUpdateContext } from '@pages/ProfileUpdatePage';
import { IValidateContext } from '@pages/ValidatePage';

export interface FormContainerProps {
  where: 'login' | 'validate-password' | 'profile-update';
  context: ILoginContext | IValidateContext | IProfileUpdateContext;
}
