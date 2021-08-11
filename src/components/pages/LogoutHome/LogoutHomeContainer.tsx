import React, { createContext, useContext } from 'react';

import { useForm } from 'react-hook-form';

import { LoginFormInput } from '@atoms/Input';
import { LogoutHomePresenter } from '@pages/LogoutHome/LogoutHomePresenter';

export interface IFormContext {
  onLoginValid: () => void;
}
const FormContext = createContext<IFormContext | undefined>(undefined);
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('Form Context가 존재하지 않습니다');
  return context;
};

export const LogoutHomeContainer = () => {
  const { getValues: loginGetValues } = useForm<LoginFormInput>();

  const value = {
    onLoginValid,
  };

  function onLoginValid() {
    console.log(loginGetValues());
  }

  return (
    <FormContext.Provider value={value}>
      <LogoutHomePresenter />
    </FormContext.Provider>
  );
};
