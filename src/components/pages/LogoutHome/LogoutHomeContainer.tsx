import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useContext } from 'react';
import {
  Control,
  DeepMap,
  FieldError,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import * as yup from 'yup';

import { LoginFormInput } from '@atoms/Input';
import { LogoutHomePresenter } from '@pages/LogoutHome/LogoutHomePresenter';

export interface IFormContext {
  register: UseFormRegister<LoginFormInput>;
  handleSubmit: UseFormHandleSubmit<LoginFormInput>;
  control: Control<LoginFormInput>;
  onValid: () => void;
  errors: DeepMap<LoginFormInput, FieldError>;
}

const LoginFormContext = createContext<IFormContext | undefined>(undefined);
export const useLoginFormContext = () => {
  const context = useContext(LoginFormContext);
  if (!context) throw new Error('Form Context가 존재하지 않습니다');
  return context;
};

export const LogoutHomeContainer = () => {
  const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  const {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    control: loginControl,
    getValues: loginGetValues,
    formState: { errors: loginErrors },
  } = useForm<LoginFormInput>({ mode: 'all', resolver: yupResolver(loginSchema) });

  const loginValue = {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    control: loginControl,
    onValid: onLoginValid,
    errors: loginErrors,
  };

  function onLoginValid() {
    const x = loginGetValues();
    console.log(x);
  }

  return (
    <LoginFormContext.Provider value={loginValue}>
      <LogoutHomePresenter />
    </LoginFormContext.Provider>
  );
};
