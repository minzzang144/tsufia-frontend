import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import * as I from '.';

import { RoomAPI } from '@api';
import { RoomPagePresenter } from '@pages/RoomPage/RoomPagePresenter';
import { getRoom, updateRoomError, updateRoomLoading } from '@room';

// Update Room Validate Schema
const updateRoomSchema = yup.object().shape({
  title: yup.string().required(),
  totalHeadCount: yup.string().required(),
});

// Update Form Context 생성
const UpdateRoomFormContext = createContext<I.IUpdateRoomFormContext | undefined>(undefined);

export const useUpdateRoomFormContext = () => {
  const context = useContext(UpdateRoomFormContext);
  if (!context) throw new Error('Form Context가 존재하지 않습니다');
  return context;
};

export const RoomPageContainer: React.FC = () => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
    reset,
  } = useForm<I.UpdateRoomFormInput>({ mode: 'all', resolver: yupResolver(updateRoomSchema) });
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();

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
    reset({ title: '', totalHeadCount: '' });
  }

  function onToggleModal() {
    setToggleModal(!toggleModal);
  }

  async function getRoomProcess() {
    try {
      dispatch(updateRoomLoading());
      const { id } = params;
      const response = await RoomAPI.getRoom({ roomId: id });
      const { ok, error, room } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true && room) dispatch(getRoom(room));
    } catch (error) {
      throw new Error(error);
    } finally {
      dispatch(updateRoomLoading());
    }
  }

  useEffect(() => {
    getRoomProcess();
  }, []);

  return (
    <UpdateRoomFormContext.Provider value={value}>
      <RoomPagePresenter />
    </UpdateRoomFormContext.Provider>
  );
};
