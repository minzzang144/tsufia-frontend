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
import { getRooms, updateRoomsError, updateRoomsLoading } from '@rooms';

// Create Room Context Interface
interface ICreateRoomFormContext {
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

// Login Validate Schema
const createRoomSchema = yup.object().shape({
  title: yup.string().required(),
  totalHeadCount: yup.string().required(),
});

// Login Form Context 생성
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

  function onValid() {
    console.log(getValues());
    reset({ title: '', totalHeadCount: '4' });
  }

  function onToggleModal() {
    setToggleModal(!toggleModal);
  }

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
  }, []);

  return (
    <CreateRoomFormContext.Provider value={value}>
      <LoginHomePresenter />
    </CreateRoomFormContext.Provider>
  );
};