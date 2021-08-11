import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputProps {
  register?: UseFormRegisterReturn;
  type?: string;
}

export interface LoginFormInput {
  email: string;
  password: string;
}
