import {
  Control,
  DeepMap,
  FieldError,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { ValidatePageContainer } from '@pages/ValidatePage/ValidatePageContainer';

export default ValidatePageContainer;

export interface IValidateContext {
  register: UseFormRegister<ValidateFormInput>;
  handleSubmit: UseFormHandleSubmit<ValidateFormInput>;
  control: Control<ValidateFormInput>;
  onValid: () => void;
  errors: DeepMap<ValidateFormInput, FieldError>;
  isValid: boolean;
}

export interface ValidateFormInput {
  password: string;
}
