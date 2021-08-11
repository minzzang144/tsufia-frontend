import React, { createContext, useContext } from 'react';

import { useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

import { LoginFormInput } from '@atoms/Input';
import { LogoutHomePresenter } from '@pages/LogoutHome/LogoutHomePresenter';

export interface IFormContext {
  loginRegister: UseFormRegister<LoginFormInput>;
  loginHandleSubmit: UseFormHandleSubmit<LoginFormInput>;
  onLoginValid: () => void;
}

const FormContext = createContext<IFormContext | undefined>(undefined);
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('Form Context가 존재하지 않습니다');
  return context;
};

export const LogoutHomeContainer = () => {
  const {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    getValues: loginGetValues,
  } = useForm<LoginFormInput>();

  const value = {
    loginRegister,
    loginHandleSubmit,
    onLoginValid,
  };

  function onLoginValid() {
    const x = loginGetValues();
    console.log(x);
  }

  return (
    <FormContext.Provider value={value}>
      <LogoutHomePresenter />
    </FormContext.Provider>
  );
};
