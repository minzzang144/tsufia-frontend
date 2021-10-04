import {
  Control,
  DeepMap,
  FieldError,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

import { ProfileUpdatePageContainer } from '@pages/ProfileUpdatePage/ProfileUpdatePageContainer';

export default ProfileUpdatePageContainer;

export interface IProfileUpdateContext {
  register: UseFormRegister<ProfileUpdateFormInput>;
  handleSubmit: UseFormHandleSubmit<ProfileUpdateFormInput>;
  control: Control<ProfileUpdateFormInput>;
  onValid: () => void;
  errors: DeepMap<ProfileUpdateFormInput, FieldError>;
  isValid: boolean;
}

export interface ProfileUpdateFormInput {
  firstName: string;
  lastName: string;
  password: string;
  checkPassword: string;
}
