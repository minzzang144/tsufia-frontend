import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Prompt, useParams } from 'react-router-dom';
import * as yup from 'yup';

import * as I from '.';

import { RoomAPI } from '@api';
import { RoomPagePresenter } from '@pages/RoomPage/RoomPagePresenter';
import {
  enterRoom,
  getRoom,
  leaveRoom,
  removeRoom,
  updateRoom,
  updateRoomError,
  updateRoomLoading,
} from '@room';
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

  // 사용자가 방에 처음 입장했을 때 방의 정보를 가져오는 이벤트
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

  // 다른 사용자가 방에 입장했을 때 방의 정보를 업데이트 하는 이벤트
  async function enterRoomProcess() {
    try {
      const { id } = params;
      const response = await RoomAPI.enterRoom({ roomId: id });
      const { ok, error, room } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true && room) {
        socket.emit('rooms:enter:server', room);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function leaveRoomProcess() {
    try {
      const { id } = params;
      const response = await RoomAPI.leaveRoom({ roomId: id });
      const { ok, error, room } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true && room) {
        socket.emit('rooms:leave:server', room);
      }
      console.log('leaveRoomProcess-inner');
    } catch (error) {
      throw new Error(error);
    }
  }

  async function removeRoomProcess() {
    try {
      const response = await RoomAPI.removeRoom();
      const { ok, error, roomId } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true && roomId) {
        socket.emit('rooms:remove:server', roomId);
      }
      console.log('removeRoomProcess-inner');
    } catch (error) {
      throw new Error(error);
    }
  }

  function handleBeforeUnload(e: BeforeUnloadEvent) {
    e.preventDefault();
    if (e) {
      e.returnValue = '게임을 나가시겠습니까? 게임중에는 다시 입장할 수 없습니다.';
    }
    return '게임을 나가시겠습니까? 게임중에는 다시 입장할 수 없습니다.';
  }

  useEffect(() => {
    getRoomProcess();
    enterRoomProcess();
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      leaveRoomProcess();
      removeRoomProcess();
    };
  }, []);

  useEffect(() => {
    // 클라이언트가 속한 방에서 모든 소켓이 Redux Store의 Room을 업데이트 한다
    socket.on('rooms:update:client', (data) => {
      dispatch(updateRoom(data));
      if (storeRoom) {
        reset({ title: storeRoom.title, totalHeadCount: String(storeRoom.totalHeadCount) });
      }
    });

    // 누군가 방에 입장한 경우 room.userList에 새로운 유저를 추가한다
    socket.on('rooms:enter:each-client', (data) => {
      dispatch(enterRoom(data));
    });

    // 누군가 방에서 퇴장한 경우 room.userList에서 유저를 삭제한다
    socket.on('rooms:leave:each-client', (data) => {
      dispatch(leaveRoom(data));
    });

    // 방의 마지막 멤버가 퇴장한 경우 해당 room을 삭제한다
    socket.on('rooms:remove:each-client', () => {
      dispatch(removeRoom());
    });
  }, []);

  return (
    <UpdateRoomFormContext.Provider value={value}>
      <Prompt message="게임을 나가시겠습니까? 게임중에는 다시 입장할 수 없습니다." />
      <RoomPagePresenter />
    </UpdateRoomFormContext.Provider>
  );
};
