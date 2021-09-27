import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  Control,
  DeepMap,
  FieldError,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import socket from '@/socket';
import { RoomAPI } from '@api';
import { LoginHomePresenter } from '@pages/LoginHome/LoginHomePresenter';
import {
  addRooms,
  enterRooms,
  getRooms,
  leaveRooms,
  removeRooms,
  updateRooms,
  updateRoomsError,
  updateRoomsLoading,
} from '@rooms';
import { RootState } from '@modules';

// Create Room Context Interface
export interface ICreateRoomFormContext {
  register: UseFormRegister<CreateRoomFormInput>;
  handleSubmit: UseFormHandleSubmit<CreateRoomFormInput>;
  control: Control<CreateRoomFormInput>;
  onValid: () => void;
  errors: DeepMap<CreateRoomFormInput, FieldError>;
  isValid: boolean;
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

// Create Form Context 생성
const CreateRoomFormContext = createContext<ICreateRoomFormContext | undefined>(undefined);

export const useCreateRoomFormContext = () => {
  const context = useContext(CreateRoomFormContext);
  if (!context) throw new Error('Form Context가 존재하지 않습니다');
  return context;
};

export const LoginHomeContainer: React.FC = () => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
    reset,
  } = useForm<CreateRoomFormInput>({ mode: 'all', resolver: yupResolver(createRoomSchema) });
  const rooms = useSelector((state: RootState) => state.rooms.data);
  const dispatch = useDispatch();
  const history = useHistory();

  const value = {
    register,
    handleSubmit,
    control,
    onValid,
    errors,
    isValid,
    toggleModal,
    onToggleModal,
  };

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

  // Create Form Modal Toggling
  function onToggleModal() {
    setToggleModal(!toggleModal);
  }

  // 모든 방의 정보를 가져오기
  const getRoomsProcess = async () => {
    if (rooms && rooms.length === 1) return;
    try {
      dispatch(updateRoomsLoading());
      const response = await RoomAPI.getRooms();
      if (response.ok === false && response.error) dispatch(updateRoomsError(response.error));
      if (response.ok === true && response.rooms) {
        dispatch(getRooms(response.rooms));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateRoomsLoading());
    }
  };

  const addRoomCallback = (data: any) => {
    dispatch(addRooms(data));
  };
  const updateRoomCallback = (data: any) => {
    dispatch(updateRooms(data));
  };
  const enterRoomCallback = (data: any) => {
    dispatch(enterRooms(data));
  };
  const leaveRoomCallback = (data: any) => {
    dispatch(leaveRooms(data));
  };
  const removeRoomCallback = (data: any) => {
    dispatch(removeRooms(data));
  };

  useEffect(() => {
    getRoomsProcess();
    socket.emit('rooms:join:server');
    localStorage.setItem('increment', '-1');
    localStorage.setItem('cycle', '1');
  }, []);

  useEffect(() => {
    // 실시간으로 생성되는 방의 정보를 가져오기
    socket.on('rooms:create:client', addRoomCallback);
    // 실시간으로 수정되는 방의 정보를 가져오기
    socket.on('rooms:update:client', updateRoomCallback);
    // 실시간으로 방에 입장하는 유저를 추가하기
    socket.on('rooms:enter:client', enterRoomCallback);
    // 실시간으로 방을 나가는 유저를 제거하기
    socket.on('rooms:leave:client', leaveRoomCallback);
    // 실시간으로 삭제되는 방의 정보를 가져오기
    socket.on('rooms:remove:client', removeRoomCallback);
    return () => {
      socket.off('rooms:create:client', addRoomCallback);
      socket.off('rooms:update:client', updateRoomCallback);
      socket.off('rooms:enter:client', enterRoomCallback);
      socket.off('rooms:leave:client', leaveRoomCallback);
    };
  }, []);

  return (
    <CreateRoomFormContext.Provider value={value}>
      <LoginHomePresenter />
    </CreateRoomFormContext.Provider>
  );
};
