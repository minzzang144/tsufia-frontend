/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@molecules/Notification/style';

import { Span } from '@atoms/Span/Span';
import { useRoomPageContext } from '@pages/RoomPage/RoomPageContainer';
import { User, UserRole } from '@auth';
import { RootState } from '@modules';
import { Cycle } from '@game';
import { Paragraph } from '@atoms/Paragraph/Paragraph';

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
    if (room && !room.game) {
      return (
        <>
          <Paragraph wordbreakprop="break-word" whitespaceprop="pre-line" textalignprop="center">
            {`Tsufia 게임에 참여하신 것을 환영합니다!
            곧 게임이 시작됩니다
            게임이 시작되기까지 ${room.totalHeadCount - room.currentHeadCount}명 남았습니다
            `}
          </Paragraph>
        </>
      );
    }
    if (room && room.game && countDown > 0) {
      switch (room.game.cycle) {
        case null:
          return (
            <Paragraph wordbreakprop="break-word" whitespaceprop="pre-line" textalignprop="center">
              {`게임 시작까지 ${countDown}초 남았습니다`}
            </Paragraph>
          );
        case Cycle.밤:
          return (
            <Paragraph wordbreakprop="break-word" whitespaceprop="pre-line" textalignprop="center">
              {`밤이 되었습니다. 마피아는 서로를 확인하시기 바랍니다
                  마피아는 죽일 사람을 선택해 주세요
                  ${countDown}초 남았습니다
                `}
              {currentUser?.role === UserRole.Mafia && (
                <Span displayProp="inline-flex" levelProp={4} colorProp="red">
                  당신은 마피아입니다. 시민을 모두 죽여 게임을 승리하세요!
                </Span>
              )}
              {currentUser?.role === UserRole.Citizen &&
                `당신은 시민입니다. 마피아를 모두 찾아 게임을 승리하세요!`}
            </Paragraph>
          );
        case Cycle.낮:
          return currentUser?.survive ? (
            <Paragraph wordbreakprop="break-word" whitespaceprop="pre-line" textalignprop="center">
              {`낮이 되었습니다
              `}
              {selectUser ? (
                <Span displayProp="inline-flex" levelProp={4} colorProp="red">{`${getUserFullName(
                  selectUser.firstName,
                  selectUser.lastName,
                  selectUser.nickname,
                )}님이 살해당하였습니다`}</Span>
              ) : (
                `밤 사이 아무일도 일어나지 않았습니다`
              )}
              {`
              시민 여러분께 낮 동안 자유롭게 대화할 시간 ${countDown}초를 드립니다`}
            </Paragraph>
          ) : (
            <Paragraph wordbreakprop="break-word" whitespaceprop="pre-line" textalignprop="center">
              {`당신은 살해당하였습니다
              지금부터 다른 유저와의 소통은 불가하며 죽은 사람 또는 마피아와 채팅할 수 있습니다
              ${countDown}초 남았습니다
              `}
            </Paragraph>
          );
        case Cycle.저녁:
          return (
            <Paragraph wordbreakprop="break-word" whitespaceprop="pre-line" textalignprop="center">
              {`투표의 시간이 찾아왔습니다
              투표는 비공개로 이루어지며 아래 사용자 박스에서 클릭하여 선택할 수 있습니다
              ${countDown}초 남았습니다
              `}
            </Paragraph>
          );
        default:
          break;
      }
    } else if (roomError) {
      return (
        <Paragraph wordbreakprop="break-word" whitespaceprop="pre-line" textalignprop="center">
          {roomError}
        </Paragraph>
      );
    }
  }

  return <S.Wrapper {...rest}>{renderGameNotification()}</S.Wrapper>;
};
