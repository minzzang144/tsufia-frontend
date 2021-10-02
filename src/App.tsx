import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import socket from '@/socket';
import { AuthAPI, axiosInstance } from '@api';
import {
  GoogleLoginRequest,
  KakaoLoginRequest,
  LoginResponse,
  SilentRefreshResponse,
} from '@api-types';
import { LoginFormInput, SignUpFormInput } from '@atoms/Input';
import { getUser, updateError, updateLoading, updateToken } from '@auth/actions';
import { RootState } from '@modules';
import { LoginRouter } from '@routers/LoginRouter';
import { LogoutRouter } from '@routers/LogoutRouter';
import { useHistory } from 'react-router';

function App() {
  const [toggle, setToggle] = useState<boolean>(false);
  const accessToken = useSelector((state: RootState) => state.authentication.token);
  const dispatch = useDispatch();
  const history = useHistory();

  /* Sign Up 진행 시 실행되는 함수 */
  async function onSignUp(body: SignUpFormInput) {
    try {
      dispatch(updateLoading());
      const response = await AuthAPI.signUp(body);
      const { ok, error } = response;
      if (ok === false && error) dispatch(updateError(error));
      if (ok === true) {
        window.alert('회원가입을 성공했습니다.');
        setToggle(!toggle);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading());
    }
  }

  /* Login 진행 시 실행되는 함수 */
  async function onLogin(body: LoginFormInput) {
    try {
      dispatch(updateLoading());
      const response = await AuthAPI.login(body);
      const { ok, error } = response;
      if (ok === false && error) dispatch(updateError(error));
      if (ok === true) onLoginSuccess(response);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading());
    }
  }

  /* Google Login 진행 시 실행되는 함수 */
  async function onGoogleLogin(body: GoogleLoginRequest) {
    try {
      dispatch(updateLoading());
      const response = await AuthAPI.googleLogin(body);
      const { ok, error } = response;
      if (ok === false && error) dispatch(updateError(error));
      if (ok === true) onLoginSuccess(response);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading());
    }
  }

  /* Google Login 진행 시 실행되는 함수 */
  async function onKakaoLogin(body: KakaoLoginRequest) {
    try {
      dispatch(updateLoading());
      const response = await AuthAPI.kakaoLogin(body);
      const { ok, error } = response;
      if (ok === false && error) dispatch(updateError(error));
      if (ok === true) onLoginSuccess(response);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading());
    }
  }

  /* 토큰 재발급 함수 */
  async function onSilentRefresh() {
    try {
      dispatch(updateLoading());
      const response = await AuthAPI.silentRefresh();
      const { ok, error } = response;
      if (ok === false && error) {
        history.push('/');
      }
      if (ok === true) onLoginSuccess(response);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading());
    }
  }

  /* 로그인 성공 시 실행되는 함수 */
  async function onLoginSuccess(response: LoginResponse | SilentRefreshResponse) {
    try {
      const { accessToken } = response;
      if (accessToken) {
        dispatch(updateToken(accessToken));
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        getUserInformation();
        setTimeout(onSilentRefresh, Number(process.env.REACT_APP_EXPIRES_IN));
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 유저 정보를 가져오는 함수
  async function getUserInformation() {
    try {
      const response = await AuthAPI.getUser();
      const { ok, error, user } = response;
      if (ok === false && error) dispatch(updateError(error));
      if (ok === true && user) {
        dispatch(getUser(user));
        socket.emit('users:get:server', user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* 새로고침 또는 사이트 재접속 후 실행되는 함수 */
  useEffect(() => {
    onSilentRefresh();
  }, []);

  return (
    <React.Fragment>
      {accessToken ? (
        <LoginRouter />
      ) : (
        <LogoutRouter
          onLogin={onLogin}
          onGoogleLogin={onGoogleLogin}
          onKakaoLogin={onKakaoLogin}
          onSignUp={onSignUp}
          toggle={toggle}
          setToggle={setToggle}
        />
      )}
    </React.Fragment>
  );
}

export default App;
