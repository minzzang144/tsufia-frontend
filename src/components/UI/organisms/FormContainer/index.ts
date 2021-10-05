import { ILoginContext, ISignUpContext } from '@pages/LogoutHome/LogoutHomeContainer';
import { IProfileUpdateContext } from '@pages/ProfileUpdatePage';
import { IValidateContext } from '@pages/ValidatePage';

export interface FormContainerProps {
  where: 'login' | 'sign-up' | 'validate-password' | 'profile-update';
  context: ISignUpContext | ILoginContext | IValidateContext | IProfileUpdateContext;
}
