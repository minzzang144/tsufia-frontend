import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import * as I from '.';

import { RoomPagePresenter } from '@pages/RoomPage/RoomPagePresenter';

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

  return (
    <UpdateRoomFormContext.Provider value={value}>
      <RoomPagePresenter />
    </UpdateRoomFormContext.Provider>
  );
};
