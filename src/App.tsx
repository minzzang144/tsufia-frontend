import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  Control,
  DeepMap,
  FieldError,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import * as yup from 'yup';

import socket from '@/socket';
import { AuthAPI, axiosInstance, RoomAPI } from '@api';
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
import { Room } from '@room';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateRoomsError } from '@rooms';

interface ILogInContext {
  onLogout: () => Promise<void>;
  onToggleModal: () => void;
  toggleModal: boolean;
}

// Create Room Context Interface
export interface ICreateRoomFormContext {
  register: UseFormRegister<CreateRoomFormInput>;
  handleSubmit: UseFormHandleSubmit<CreateRoomFormInput>;
  control: Control<CreateRoomFormInput>;
  onValid: () => void;
  errors: DeepMap<CreateRoomFormInput, FieldError>;
  isValid: boolean;
  onRoomClick: (room: Room) => void;
}

// Create Room Form Input Interface
interface CreateRoomFormInput {
  title: string;
  totalHeadCount: string;
}

// Create Room Validate Schema
const createRoomSchema = yup.object().shape({
  title: yup.string().required(),
  totalHeadCount: yup.string().required(),
});

// Login Context 생성
const LoginContext = createContext<ILogInContext | undefined>(undefined);
// Create Form Context 생성
const CreateRoomFormContext = createContext<ICreateRoomFormContext | undefined>(undefined);

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) throw new Error('Login Context가 존재하지 않습니다');
  return context;
};

export const useCreateRoomFormContext = () => {
  const context = useContext(CreateRoomFormContext);
  if (!context) throw new Error('Form Context가 존재하지 않습니다');
  return context;
};

function App() {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
    reset,
  } = useForm<CreateRoomFormInput>({ mode: 'all', resolver: yupResolver(createRoomSchema) });
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
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

  /* Logout 진행 시 실행되는 함수 */
  async function onLogout() {
    try {
      const response = await AuthAPI.logout();
      const { ok, error } = response;
      if (!ok && error) alert(error);
      if (ok) {
        alert('로그아웃 하였습니다');
        history.push('/');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
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

  // Create Room Form Modal Toggling
  function onToggleModal() {
    setToggleModal(!toggleModal);
  }

  // Create Room Form 값들이 유효하면 방을 생성한다
  async function onValid() {
    try {
      const { title, totalHeadCount } = getValues();
      const response = await RoomAPI.createRoom({ title, totalHeadCount: +totalHeadCount });
      const { ok, error, room } = response;
      if (ok === false && error) dispatch(updateRoomsError(error));
      reset({ title: '', totalHeadCount: '4' });
      if (ok === true && room) {
        socket.emit('rooms:create:server', room);
        history.push(`/rooms/${room.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [Private] 방을 클릭할 때 실행하는 함수
  function onRoomClick(room: Room) {
    if (room.currentHeadCount === room.totalHeadCount) {
      alert('방의 최대 입장 인원을 초과하였습니다');
    } else {
      history.push(`rooms/${room.id}`);
    }
  }

  const loginValue = {
    onLogout,
    onToggleModal,
    toggleModal,
  };

  const value = {
    register,
    handleSubmit,
    control,
    onValid,
    errors,
    isValid,
    onRoomClick,
  };

  /* 새로고침 또는 사이트 재접속 후 실행되는 함수 */
  useEffect(() => {
    onSilentRefresh();
  }, []);

  return (
    <React.Fragment>
      {accessToken ? (
        <LoginContext.Provider value={loginValue}>
          <CreateRoomFormContext.Provider value={value}>
            <LoginRouter />
          </CreateRoomFormContext.Provider>
        </LoginContext.Provider>
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
