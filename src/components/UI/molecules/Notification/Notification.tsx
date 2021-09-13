/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@molecules/Notification/style';

import { Span } from '@atoms/Span/Span';
import { useRoomPageContext } from '@pages/RoomPage/RoomPageContainer';
import { User, UserRole } from '@auth';
import { RootState } from '@modules';
import { Cycle } from '@game';

export const Notification: React.FC = ({ children, ...rest }) => {
  const { countDown, selectCitizenId } = useRoomPageContext();
  const { roomError, room, user } = useSelector(
    (state: RootState) => ({
      roomError: state.room.error,
      room: state.room.data,
      user: state.authentication.user,
    }),
    shallowEqual,
  );
  let currentUser: User | undefined;
  let selectUser: User | undefined;
  if (room && user) currentUser = room.userList.find((listUser) => listUser.id === user.id);
  if (selectCitizenId)
    selectUser = room?.userList.find((listUser) => listUser.id === selectCitizenId);

  function getUserFullName(firstName: string, lastName: string, nickname: string): string {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else {
      return nickname;
    }
  }

  function renderGameNotification() {
    if (room && room.game && countDown > 0) {
      switch (room.game.cycle) {
        case null:
          return (
            <Span
              positionprop="absolute"
              topprop="6rem"
              displayProp="inline-flex"
              justifyContentprop="center"
              widthprop="70%"
              levelProp={4}
              marginProp={['0']}
              colorProp="white"
            >{`게임 시작까지 ${countDown}초 남았습니다`}</Span>
          );
        case Cycle.밤:
          return (
            <>
              <Span
                positionprop="absolute"
                topprop="6rem"
                displayProp="inline-flex"
                justifyContentprop="center"
                widthprop="70%"
                levelProp={4}
                marginProp={['0']}
                colorProp="white"
              >
                밤이 되었습니다. 마피아는 서로를 확인하시기 바랍니다
              </Span>
              <Span
                positionprop="absolute"
                topprop="7.5rem"
                displayProp="inline-flex"
                justifyContentprop="center"
                widthprop="70%"
                levelProp={4}
                marginProp={['0']}
                colorProp="white"
              >
                마피아는 죽일 사람을 선택해 주세요
              </Span>
              <Span
                positionprop="absolute"
                topprop="9rem"
                displayProp="inline-flex"
                justifyContentprop="center"
                widthprop="70%"
                levelProp={4}
                marginProp={['0']}
                colorProp="white"
              >{`${countDown}초 남았습니다`}</Span>
              {currentUser?.role === UserRole.Mafia && (
                <Span
                  positionprop="absolute"
                  topprop="11rem"
                  displayProp="inline-flex"
                  justifyContentprop="center"
                  widthprop="70%"
                  levelProp={4}
                  marginProp={['0']}
                  colorProp="red"
                >
                  당신은 마피아입니다. 시민을 모두 죽여 게임을 승리하세요!
                </Span>
              )}
              {currentUser?.role === UserRole.Citizen && (
                <Span
                  positionprop="absolute"
                  topprop="11rem"
                  displayProp="inline-flex"
                  justifyContentprop="center"
                  widthprop="70%"
                  levelProp={4}
                  marginProp={['0']}
                  colorProp="white"
                >
                  당신은 시민입니다. 마피아를 모두 찾아 게임을 승리하세요!
                </Span>
              )}
            </>
          );
        case Cycle.낮:
          return (
            <>
              <Span
                positionprop="absolute"
                topprop="6rem"
                displayProp="inline-flex"
                justifyContentprop="center"
                widthprop="70%"
                levelProp={4}
                marginProp={['0']}
                colorProp="white"
              >
                낮이 되었습니다
              </Span>
              {selectUser ? (
                <Span
                  positionprop="absolute"
                  topprop="7.5rem"
                  displayProp="inline-flex"
                  justifyContentprop="center"
                  widthprop="70%"
                  levelProp={4}
                  marginProp={['0']}
                  colorProp="red"
                >
                  {`${getUserFullName(
                    selectUser.firstName,
                    selectUser.lastName,
                    selectUser.nickname,
                  )}님이 살해당하였습니다`}
                </Span>
              ) : (
                <Span
                  positionprop="absolute"
                  topprop="7.5rem"
                  displayProp="inline-flex"
                  justifyContentprop="center"
                  widthprop="70%"
                  levelProp={4}
                  marginProp={['0']}
                  colorProp="white"
                >
                  밤 사이 아무일도 일어나지 않았습니다
                </Span>
              )}
              <Span
                positionprop="absolute"
                topprop="9rem"
                displayProp="inline-flex"
                justifyContentprop="center"
                widthprop="70%"
                levelProp={4}
                marginProp={['0']}
                colorProp="white"
              >
                {`시민 여러분께 낮 동안 자유롭게 대화할 시간 ${countDown}초를 드립니다`}
              </Span>
            </>
          );
        default:
          break;
      }
    } else if (roomError) {
      return (
        <Span
          positionprop="absolute"
          topprop="6rem"
          displayProp="inline-flex"
          justifyContentprop="center"
          widthprop="70%"
          levelProp={4}
          marginProp={['0']}
          colorProp="white"
        >
          {roomError}
        </Span>
      );
    }
  }

  return <S.Wrapper {...rest}>{renderGameNotification()}</S.Wrapper>;
};
