import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
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
import { errorUpdate, loadingUpdate, tokenUpdate } from '@modules/auth';

// Form Context 인터페이스
export interface IFormContext {
  register: UseFormRegister<LoginFormInput>;
  handleSubmit: UseFormHandleSubmit<LoginFormInput>;
  control: Control<LoginFormInput>;
  onValid: () => void;
  errors: DeepMap<LoginFormInput, FieldError>;
  isValid: boolean;
}

// Login Form Context 생성
const LoginFormContext = createContext<IFormContext | undefined>(undefined);
export const useLoginFormContext = () => {
  const context = useContext(LoginFormContext);
  if (!context) throw new Error('Form Context가 존재하지 않습니다');
  return context;
};

// Login Validate Schema
const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const LogoutHomeContainer: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    control: loginControl,
    getValues: loginGetValues,
    formState: { errors: loginErrors, isValid: loginIsValid },
  } = useForm<LoginFormInput>({ mode: 'all', resolver: yupResolver(loginSchema) });

  const loginValue = {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    control: loginControl,
    onValid: onLoginValid,
    errors: loginErrors,
    isValid: loginIsValid,
  };

  function onLoginValid() {
    const values = loginGetValues();
    onLogin(values);
  }

  async function onLogin(body: LoginFormInput) {
    try {
      dispatch(loadingUpdate());
      const response = await AuthAPI.login(body);
      const { ok, error, accessToken } = response;
      if (ok === false && error) dispatch(errorUpdate(error));
      if (ok === true && accessToken) {
        dispatch(tokenUpdate(accessToken));
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        dispatch(loadingUpdate());
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
