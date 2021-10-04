import { IProfileUpdateContext } from '@pages/ProfileUpdatePage';
import { IValidateContext } from '@pages/ValidatePage';

export interface FormContainerProps {
  where: 'validate-password' | 'profile-update';
  context: IValidateContext | IProfileUpdateContext;
}
