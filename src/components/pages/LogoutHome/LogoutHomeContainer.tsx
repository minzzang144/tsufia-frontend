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

import { AuthAPI, axiosInstance } from '@api';
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

export const LogoutHomeContainer: React.FC = () => {
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
    const values = loginGetValues();
    onLogin(values);
  }

  async function onLogin(body: LoginFormInput) {
    try {
      const response = await AuthAPI.login(body);
      const { ok, error, accessToken } = response;
      if (ok === false) console.log(error);
      if (ok === true && accessToken) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        console.log(accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <LoginFormContext.Provider value={loginValue}>
      <LogoutHomePresenter />
    </LoginFormContext.Provider>
  );
};
