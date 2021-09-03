import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@organisms/Game/style';

import { Span } from '@atoms/Span/Span';
import { ChatForm } from '@molecules/ChatForm/ChatForm';
import { ChatList } from '@molecules/ChatList/ChatList';
import { FormModal } from '@molecules/FormModal/FormModal';
import { Notification } from '@molecules/Notification/Notification';
import { UserList } from '@molecules/UserList/UserList';
import { RootState } from '@modules';
import { useUpdateRoomFormContext } from '@pages/RoomPage/RoomPageContainer';

export const Game: React.FC = () => {
  const updateRoomFormContext = useUpdateRoomFormContext();
  const { roomLoading, gameLoading, roomError, gameError, room, game } = useSelector(
    (state: RootState) => ({
      roomLoading: state.room.loading,
      gameLoading: state.game.loading,
      roomError: state.room.error,
      gameError: state.game.error,
      room: state.room.data,
      game: state.game.data,
    }),
    shallowEqual,
  );

  return (
    <React.Fragment>
      {roomLoading === false && room ? (
        <S.Wrapper>
          <FormModal
            roomFormContext={updateRoomFormContext}
            title="방 수정하기"
            defaultValue={{ input: room.title, radio: String(room.totalHeadCount) }}
          />
          <Notification>
            {gameLoading === false && game ? `${game.countDown}초 남았습니다` : gameError}
          </Notification>
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
