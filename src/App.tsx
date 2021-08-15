import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { AuthAPI, axiosInstance } from '@api';
import { LoginResponse, SilentRefreshResponse } from '@api-types';
import { LoginFormInput } from '@atoms/Input';
import LogoutHome from '@pages/LogoutHome';
import { updateError, updateLoading, updateToken } from '@auth/actions';
import { RootState } from '@modules';

function App() {
  const accessToken = useSelector((state: RootState) => state.authentication.token);
  const dispatch = useDispatch();
  const history = useHistory();

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
      {accessToken ? 'You are Logged In' : <LogoutHome onLogin={onLogin} />}
    </React.Fragment>
  );
}

export default App;
