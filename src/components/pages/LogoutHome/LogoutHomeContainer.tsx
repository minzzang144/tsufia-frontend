import React, { createContext, useContext } from 'react';

import { useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

import { LoginFormInput } from '@atoms/Input';
import { LogoutHomePresenter } from '@pages/LogoutHome/LogoutHomePresenter';

export interface IFormContext {
  register: UseFormRegister<LoginFormInput>;
  handleSubmit: UseFormHandleSubmit<LoginFormInput>;
  onValid: () => void;
}

const LoginFormContext = createContext<IFormContext | undefined>(undefined);
export const useLoginFormContext = () => {
  const context = useContext(LoginFormContext);
  if (!context) throw new Error('Form Context가 존재하지 않습니다');
  return context;
};

export const LogoutHomeContainer = () => {
  const {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    getValues: loginGetValues,
  } = useForm<LoginFormInput>();

  const loginValue = {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    onValid: onLoginValid,
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
