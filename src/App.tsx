import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { AuthAPI, axiosInstance } from '@api';
import {
  GoogleLoginRequest,
  KakaoLoginRequest,
  LoginResponse,
  SilentRefreshResponse,
} from '@api-types';
import { LoginFormInput, SignUpFormInput } from '@atoms/Input';
import LogoutHome from '@pages/LogoutHome';
import { updateError, updateLoading, updateToken } from '@auth/actions';
import { RootState } from '@modules';

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
        setTimeout(onSilentRefresh, Number(process.env.REACT_APP_EXPIRES_IN));
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
        'You are Logged In'
      ) : (
        <LogoutHome
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
