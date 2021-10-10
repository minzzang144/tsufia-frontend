import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  Control,
  DeepMap,
  FieldError,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import LoginHome from '@pages/LoginHome';
import ProfilePage from '@pages/ProfilePage';
import ProfileUpdatePage from '@pages/ProfileUpdatePage';
import RoomPage from '@pages/RoomPage';
import ValidatePage from '@pages/ValidatePage';
import { AuthAPI, RoomAPI } from '@api';
import { updateRoomsError } from '@rooms';
import { yupResolver } from '@hookform/resolvers/yup';
import { Room } from '@room';
import { useDispatch } from 'react-redux';
import socket from '@/socket';

// Login Context Interface
interface ILogInContext {
  onLogout: () => Promise<void>;
  isOpen: boolean;
  toggleDrawer: () => void;
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
  toggleModal: boolean;
  onToggleModal: () => void;
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

const LoginWrapper: React.FC = ({ children }) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
    reset,
  } = useForm<CreateRoomFormInput>({ mode: 'all', resolver: yupResolver(createRoomSchema) });
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  // Create Room Form 값들이 유효하면 방을 생성한다
  async function onValid() {
    try {
      const { title, totalHeadCount } = getValues();
      const response = await RoomAPI.createRoom({ title, totalHeadCount: +totalHeadCount });
      const { ok, error, room } = response;
      if (ok === false && error) dispatch(updateRoomsError(error));
      reset({ title: '', totalHeadCount: '4' });
      if (ok === true && room) {
        setToggleModal(!toggleModal);
        socket.emit('rooms:create:server', room);
        history.push(`/rooms/${room.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Create Room Form Modal Toggling
  function onToggleModal() {
    setToggleModal(!toggleModal);
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

  // [Private] 방을 클릭할 때 실행하는 함수
  function onRoomClick(room: Room) {
    if (room.currentHeadCount === room.totalHeadCount) {
      alert('방의 최대 입장 인원을 초과하였습니다');
    } else {
      history.push(`rooms/${room.id}`);
    }
  }

  // [Header] 네비게이션 토글링 기능
  function toggleDrawer() {
    setIsOpen((prevState) => !prevState);
  }

  const loginValue = {
    onLogout,
    isOpen,
    toggleDrawer,
  };

  const value = {
    register,
    handleSubmit,
    control,
    onValid,
    errors,
    isValid,
    onRoomClick,
    onToggleModal,
    toggleModal,
  };

  return (
    <LoginContext.Provider value={loginValue}>
      <CreateRoomFormContext.Provider value={value}>{children}</CreateRoomFormContext.Provider>
    </LoginContext.Provider>
  );
};

export const LoginRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <LoginWrapper>
          <Route path="/" exact>
            <LoginHome />
          </Route>
          <Route path="/profile" exact>
            <ProfilePage />
          </Route>
          <Route path="/users/:id/validate-password" exact>
            <ValidatePage />
          </Route>
          <Route path="/users/:id/profile-update" exact>
            <ProfileUpdatePage />
          </Route>
          <Route path="/rooms/:id" exact>
            <RoomPage />
          </Route>
        </LoginWrapper>
        <Redirect to="*" />
      </Switch>
    </Router>
  );
};
