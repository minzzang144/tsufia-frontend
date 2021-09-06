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
import { Circle } from '@game';

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
          return (
            <Notification topprop="6rem">{`게임 시작까지 ${countDown}초 남았습니다`}</Notification>
          );
        case Circle.밤:
          return (
            <>
              <Notification topprop="6rem">
                밤이 되었습니다. 마피아는 서로를 확인하시기 바랍니다
              </Notification>
              <Notification topprop="7.5rem">마피아는 죽일 사람을 선택해 주세요</Notification>
              <Notification topprop="9rem">{`${countDown}초 남았습니다`}</Notification>
            </>
          );
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
