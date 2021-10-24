import { ContactPageContainer } from '@pages/ContactPage/ContactPageContainer';
import {
  Control,
  DeepMap,
  FieldError,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

export default ContactPageContainer;

// Contact Page Presenter 인터페이스
export interface ContactPagePresenterProps {
  loading: boolean;
  state?: {
    ok: boolean;
    content: string;
  };
}

// Contact Page Context 인터페이스
export interface IContactPageContext {
  register: UseFormRegister<ContactInput>;
  handleSubmit: UseFormHandleSubmit<ContactInput>;
  control: Control<ContactInput>;
  onValid: () => void;
  errors: DeepMap<ContactInput, FieldError>;
  isValid: boolean;
}

export interface ContactInput {
  email: string;
  subject: string;
  message: string;
}
