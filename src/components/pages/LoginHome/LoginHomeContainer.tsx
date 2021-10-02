import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import socket from '@/socket';
import { RoomAPI } from '@api';
import { RootState } from '@modules';
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

export const LoginHomeContainer: React.FC = () => {
  const rooms = useSelector((state: RootState) => state.rooms.data);
  const dispatch = useDispatch();

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

  return <LoginHomePresenter />;
};
