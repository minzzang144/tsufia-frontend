import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toast';

import * as S from '@organisms/Game/style';

import { Span } from '@atoms/Span/Span';
import { ChatForm } from '@molecules/ChatForm/ChatForm';
import { ChatList } from '@molecules/ChatList/ChatList';
import { FormModal } from '@molecules/FormModal/FormModal';
import { Notification } from '@molecules/Notification/Notification';
import { UserList } from '@molecules/UserList/UserList';
import { RootState } from '@modules';
import { useRoomPageContext, useUpdateRoomFormContext } from '@pages/RoomPage/RoomPageContainer';

export const Game: React.FC = () => {
  const { countDown } = useRoomPageContext();
  const updateRoomFormContext = useUpdateRoomFormContext();
  const { roomLoading, roomError, room } = useSelector(
    (state: RootState) => ({
      roomLoading: state.room.loading,
      roomError: state.room.error,
      room: state.room.data,
    }),
    shallowEqual,
  );

  function renderGameInformation() {
    if (room && room.game && countDown > 0) {
      switch (room.game.circle) {
        case null:
          return <Notification>{`게임 시작까지 ${countDown}초 남았습니다`}</Notification>;
        default:
          break;
      }
    } else if (roomError) {
      return <Notification>{roomError}</Notification>;
    }
  }

  return (
    <React.Fragment>
      {roomLoading === false && room ? (
        <S.Wrapper>
          <FormModal
            roomFormContext={updateRoomFormContext}
            title="방 수정하기"
            defaultValue={{ input: room.title, radio: String(room.totalHeadCount) }}
          />
          {renderGameInformation()}
          <ToastContainer delay={1500} position="top-center" />
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
