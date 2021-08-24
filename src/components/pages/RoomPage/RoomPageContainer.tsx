import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import * as I from '.';

import { RoomAPI } from '@api';
import { RoomPagePresenter } from '@pages/RoomPage/RoomPagePresenter';
import { getRoom, updateRoom, updateRoomError, updateRoomLoading } from '@room';
import socket from '@/socket';
import { RootState } from '@modules';

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
  const { room: storeRoom } = useSelector(
    (state: RootState) => ({
      loading: state.room.loading,
      error: state.room.error,
      room: state.room.data,
    }),
    shallowEqual,
  );

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

  // Update Room Form이 유효한 경우 실행되는 함수
  async function onValid() {
    try {
      const { title, totalHeadCount } = getValues();
      const response = await RoomAPI.updateRoom({ title, totalHeadCount: +totalHeadCount });
      const { ok, error, room } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true && room) {
        socket.emit('rooms:update:server', room);
        setToggleModal(!toggleModal);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  function onToggleModal() {
    setToggleModal(!toggleModal);
  }

  useEffect(() => {
    // 클라이언트가 속한 방에서 모든 소켓이 Redux Store의 Room을 업데이트 한다
    socket.on('rooms:update:client', (data) => {
      dispatch(updateRoom(data));
      if (storeRoom) {
        reset({ title: storeRoom.title, totalHeadCount: String(storeRoom.totalHeadCount) });
      }
    });
  }, []);

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
