import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Prompt, useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';

import * as I from '.';

import socket from '@/socket';
import { RoomAPI } from '@api';
import { User } from '@auth';
import { RootState } from '@modules';
import {
  enterRoom,
  getRoom,
  leaveRoom,
  removeRoom,
  updateRoom,
  updateRoomError,
  updateRoomLoading,
} from '@room';
import { resetRooms } from '@rooms';
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
  if (!context) throw new Error('Update Room Form Context가 존재하지 않습니다');
  return context;
};

// Room Page Context 생성
const RoomPageContext = createContext<I.IRoomPageContext | undefined>(undefined);

export const useRoomPageContext = () => {
  const context = useContext(RoomPageContext);
  if (!context) throw new Error('Room Page Context가 존재하지 않습니다');
  return context;
};

export const RoomPageContainer: React.FC = () => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [selfUserInRoom, setSelfUserInRoom] = useState<User | undefined>();
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
  const { currentUser, room: storeRoom } = useSelector(
    (state: RootState) => ({
      currentUser: state.authentication.user,
      loading: state.room.loading,
      error: state.room.error,
      room: state.room.data,
    }),
    shallowEqual,
  );
  const history = useHistory();

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

  function onLeaveRoomListClick() {
    history.push('/');
  }

  const getSelfUserInRoom = useCallback(() => {
    if (storeRoom && currentUser) {
      const self = storeRoom.userList.find((user) => user.id === currentUser.id);
      if (self) setSelfUserInRoom(() => self);
    }
  }, [storeRoom?.userList, currentUser]);

  // 사용자가 방에 처음 입장했을 때 방의 정보를 가져오는 이벤트
  async function getRoomProcess() {
    try {
      dispatch(updateRoomLoading());
      const { id } = params;
      const response = await RoomAPI.getRoom({ roomId: id });
      const { ok, error, room } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true && room) {
        dispatch(resetRooms());
        dispatch(getRoom(room));
      }
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
        dispatch(resetRooms());
        socket.emit('rooms:enter:server', room);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // 다른 사용자가 방에서 퇴장했을 때 방의 정보를 업데이트 하는 이벤트
  async function leaveRoomProcess() {
    try {
      const { id } = params;
      const response = await RoomAPI.leaveRoom({ roomId: id });
      const { ok, error, room } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true && room) {
        dispatch(removeRoom());
        socket.emit('rooms:leave:server', room);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // 방의 마지막 멤버가 방에서 퇴장했을 때 방을 삭제하는 이벤트
  async function removeRoomProcess() {
    try {
      const response = await RoomAPI.removeRoom();
      const { ok, error, roomId } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true && roomId) {
        dispatch(removeRoom());
        socket.emit('rooms:remove:server', roomId);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  function updateRoomCallback(data: any) {
    dispatch(updateRoom(data));
    if (storeRoom) {
      reset({ title: storeRoom.title, totalHeadCount: String(storeRoom.totalHeadCount) });
    }
  }

  function enterRoomCallback(data: any) {
    dispatch(enterRoom(data));
  }

  function leaveRoomCallback(data: any) {
    dispatch(leaveRoom(data));
  }

  function removeRoomCallback() {
    dispatch(removeRoom());
  }

  function handleBeforeUnload(e: BeforeUnloadEvent) {
    e.preventDefault();
    if (e) {
      e.returnValue = '게임을 나가시겠습니까? 게임중에는 다시 입장할 수 없습니다.';
    }
    return '게임을 나가시겠습니까? 게임중에는 다시 입장할 수 없습니다.';
  }

  function handleUnload() {
    leaveRoomProcess();
    removeRoomProcess();
  }

  const roomPageValue = {
    selfUserInRoom,
    onLeaveRoomListClick,
  };

  const updateRoomFormValue = {
    register,
    handleSubmit,
    control,
    onValid,
    errors,
    isValid,
    toggleModal,
    onToggleModal,
  };

  useEffect(() => {
    getSelfUserInRoom();
  }, [storeRoom?.userList]);

  useEffect(() => {
    getRoomProcess();
    enterRoomProcess();
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
      leaveRoomProcess();
      removeRoomProcess();
    };
  }, []);

  useEffect(() => {
    // 클라이언트가 속한 방에서 모든 소켓이 Redux Store의 Room을 업데이트 한다
    socket.on('rooms:update:each-client', updateRoomCallback);
    // 누군가 방에 입장한 경우 room.userList에 새로운 유저를 추가한다
    socket.on('rooms:enter:each-client', enterRoomCallback);
    // 누군가 방에서 퇴장한 경우 room.userList에서 유저를 삭제한다
    socket.on('rooms:leave:each-client', leaveRoomCallback);
    // 방의 마지막 멤버가 퇴장한 경우 해당 room을 삭제한다
    socket.on('rooms:remove:each-client', removeRoomCallback);

    return () => {
      socket.off('rooms:update:each-client', updateRoomCallback);
      socket.off('rooms:enter:each-client', enterRoomCallback);
      socket.off('rooms:leave:each-client', leaveRoomCallback);
      socket.off('rooms:remove:each-client', removeRoomCallback);
    };
  }, []);

  return (
    <RoomPageContext.Provider value={roomPageValue}>
      <UpdateRoomFormContext.Provider value={updateRoomFormValue}>
        <Prompt message="게임을 나가시겠습니까? 게임중에는 다시 입장할 수 없습니다." />
        <RoomPagePresenter />
      </UpdateRoomFormContext.Provider>
    </RoomPageContext.Provider>
  );
};
