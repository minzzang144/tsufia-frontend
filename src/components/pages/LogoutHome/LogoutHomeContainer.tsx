import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useContext } from 'react';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import {
  Control,
  DeepMap,
  FieldError,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import * as yup from 'yup';

import * as I from '.';

import { LoginFormInput, SignUpFormInput } from '@atoms/Input';
import { LogoutHomePresenter } from '@pages/LogoutHome/LogoutHomePresenter';
import { useDispatch } from 'react-redux';
import { updateError } from '@auth';

// Login Form Context 인터페이스
export interface ILoginContext {
  register: UseFormRegister<LoginFormInput>;
  handleSubmit: UseFormHandleSubmit<LoginFormInput>;
  control: Control<LoginFormInput>;
  onValid: () => void;
  errors: DeepMap<LoginFormInput, FieldError>;
  isValid: boolean;
  onSpanClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
  toggle: boolean;
  responseSuccessGoogle: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  responseErrorGoogle: (error: any) => void;
  responseSuccessKakao: (response: any) => void;
  responseErrorKakao: (error: any) => void;
}

// Sign Up Form Context 인터페이스
export interface ISignUpContext {
  register: UseFormRegister<SignUpFormInput>;
  handleSubmit: UseFormHandleSubmit<SignUpFormInput>;
  control: Control<SignUpFormInput>;
  onValid: () => void;
  errors: DeepMap<SignUpFormInput, FieldError>;
  isValid: boolean;
  onSpanClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
  toggle: boolean;
}

// Login Form Context 생성
const LoginFormContext = createContext<ILoginContext | undefined>(undefined);
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

// Sign Up Form Context 생성
const SignUpFormContext = createContext<ISignUpContext | undefined>(undefined);
export const useSignUpFormContext = () => {
  const context = useContext(SignUpFormContext);
  if (!context) throw new Error('Form Context가 존재하지 않습니다');
  return context;
};

// Sign Up Validate Schema
const signUpSchema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  checkPassword: yup.string().required(),
});

export const LogoutHomeContainer: React.FC<I.LogoutHomeProps> = ({
  onLogin,
  onGoogleLogin,
  onKakaoLogin,
  onSignUp,
  toggle,
  setToggle,
}) => {
  const dispatch = useDispatch();
  const {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    control: loginControl,
    getValues: loginGetValues,
    formState: { errors: loginErrors, isValid: loginIsValid },
    reset: loginReset,
  } = useForm<LoginFormInput>({ mode: 'all', resolver: yupResolver(loginSchema) });

  const {
    register: signUpRegister,
    handleSubmit: signUpHandleSubmit,
    control: signUpControl,
    getValues: signUpGetValues,
    formState: { errors: signUpErrors, isValid: signUpIsValid },
    reset: signUpReset,
  } = useForm<SignUpFormInput>({ mode: 'all', resolver: yupResolver(signUpSchema) });

  const loginValue = {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    control: loginControl,
    onValid: onLoginValid,
    errors: loginErrors,
    isValid: loginIsValid,
  };

  const signUpValue = {
    register: signUpRegister,
    handleSubmit: signUpHandleSubmit,
    control: signUpControl,
    onValid: onSingUpValid,
    errors: signUpErrors,
    isValid: signUpIsValid,
  };

  const toggleValue = {
    toggle,
    onSpanClick,
  };

  const SocialLoginValue = {
    responseSuccessGoogle,
    responseErrorGoogle,
    responseSuccessKakao,
    responseErrorKakao,
  };

  async function onLoginValid() {
    const values = loginGetValues();
    await onLogin(values);
    loginReset({ email: '', password: '' });
  }

  async function onSingUpValid() {
    const values = signUpGetValues();
    await onSignUp(values);
    signUpReset({ email: '', firstName: '', lastName: '', password: '', checkPassword: '' });
  }

  function onSpanClick(e: React.MouseEvent<HTMLSpanElement>) {
    dispatch(updateError(undefined));
    e.preventDefault();
    setToggle(!toggle);
  }

  async function responseSuccessGoogle(response: any) {
    const { profileObj } = response;
    const values = {
      email: profileObj.email,
      firstName: profileObj.familyName,
      lastName: profileObj.givenName,
      photo: profileObj.imageUrl,
    };
    await onGoogleLogin(values);
  }

  function responseErrorGoogle(error: any) {
    console.log(error);
  }

  async function responseSuccessKakao(response: any) {
    const {
      profile: { kakao_account },
    } = response;
    const values = {
      email: kakao_account.email,
      nickname: kakao_account.profile.nickname,
      photo: kakao_account.profile.thumbnail_image_url,
    };
    onKakaoLogin(values);
  }

  function responseErrorKakao(error: any) {
    console.log(error);
  }

  return (
    <LoginFormContext.Provider value={{ ...loginValue, ...toggleValue, ...SocialLoginValue }}>
      <SignUpFormContext.Provider value={{ ...signUpValue, ...toggleValue }}>
        <LogoutHomePresenter />
      </SignUpFormContext.Provider>
    </LoginFormContext.Provider>
  );
};
