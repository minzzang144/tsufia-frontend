/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toast';

import * as I from '.';
import * as S from '@organisms/Game/style';

import { Span } from '@atoms/Span/Span';
import { ChatForm } from '@molecules/ChatForm/ChatForm';
import { ChatList } from '@molecules/ChatList/ChatList';
import { FormModal } from '@molecules/FormModal/FormModal';
import { UserList } from '@molecules/UserList/UserList';
import { RootState } from '@modules';
import { useUpdateRoomFormContext } from '@pages/RoomPage/RoomPageContainer';
import { Notification } from '@molecules/Notification/Notification';

export const Game: React.FC<I.GameProps> = ({ children, ...rest }) => {
  const updateRoomFormContext = useUpdateRoomFormContext();
  const { roomLoading, roomError, room } = useSelector(
    (state: RootState) => ({
      roomLoading: state.room.loading,
      roomError: state.room.error,
      room: state.room.data,
    }),
    shallowEqual,
  );

  return (
    <React.Fragment>
      {roomLoading === false && room ? (
        <S.Wrapper {...rest}>
          <FormModal
            roomFormContext={updateRoomFormContext}
            title="방 수정하기"
            defaultValue={{ input: room.title, radio: String(room.totalHeadCount) }}
          />
          <ToastContainer delay={1500} position="top-center" />
          <Notification />
          <ChatList />
          <UserList />
          <ChatForm />
        </S.Wrapper>
      ) : (
        <Span displayProp="inline-block" levelProp={3}>
          {roomError}
        </Span>
      )}
    </React.Fragment>
  );
};
