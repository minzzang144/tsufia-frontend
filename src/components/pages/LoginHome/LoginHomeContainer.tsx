import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useState, useContext, useEffect } from 'react';
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

import socket from '@/socket';
import { RoomAPI } from '@api';
import { LoginHomePresenter } from '@pages/LoginHome/LoginHomePresenter';
import { addRoom, getRooms, updateRoomsError, updateRoomsLoading } from '@rooms';
import { useHistory } from 'react-router-dom';

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
      throw new Error(error);
    }
  }

  // Create Form Modal Toggling
  function onToggleModal() {
    setToggleModal(!toggleModal);
  }

  // 모든 방의 정보를 가져오기
  const getRoomsProcess = async () => {
    try {
      dispatch(updateRoomsLoading());
      const response = await RoomAPI.getRooms();
      if (response.ok === false && response.error) dispatch(updateRoomsError(response.error));
      if (response.ok === true) socket.emit('rooms:get:server', response.rooms);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateRoomsLoading());
    }
  };

  useEffect(() => {
    getRoomsProcess();
  }, []);

  useEffect(() => {
    socket.on('rooms:get:client', (data) => {
      dispatch(getRooms(data));
    });
    socket.on('rooms:create:client', (data) => {
      dispatch(addRoom(data));
    });
  }, []);

  return (
    <CreateRoomFormContext.Provider value={value}>
      <LoginHomePresenter />
    </CreateRoomFormContext.Provider>
  );
};
