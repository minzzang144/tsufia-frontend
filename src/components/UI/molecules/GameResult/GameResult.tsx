import React, { useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@molecules/GameResult/style';

import { Heading } from '@atoms/Heading/Heading';
import { Span } from '@atoms/Span/Span';
import { TableMedia } from '@atoms/Table/Table';
import { TdataMedia } from '@atoms/Tdata/Tdata';
import { TheadMedia } from '@atoms/Thead/Thead';
import { RootState } from '@modules';
import { useRoomPageContext } from '@pages/RoomPage/RoomPageContainer';
import { Status } from '@room';
import { UserRole } from '@auth';

export const GameResult: React.FC = () => {
  const { fixedRoom, mafiaCount, citizenCount, closeGameResult, onCloseGameResult } =
    useRoomPageContext();
  const { room } = useSelector(
    (state: RootState) => ({
      room: state.room.data,
    }),
    shallowEqual,
  );

  const setHeading = useCallback((): string | undefined => {
    if (room && room.status === Status.완료) {
      if (mafiaCount === 0) {
        return 'Citizen Win';
      }
      if (mafiaCount >= citizenCount) {
        return 'Mafia Win';
      }
    }
  }, [room?.status, mafiaCount, citizenCount]);

  function getUserFullName(firstName: string, lastName: string, nickname: string): string {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else {
      return nickname;
    }
  }

  return (
    <S.Wrapper visible={room?.status === Status.완료 && !closeGameResult}>
      <S.Container>
        <S.CancelIconed onClick={() => onCloseGameResult()} />
        <Heading levelProp={2} marginProp={['8%', '0', '8%', '0']}>
          {setHeading()}
        </Heading>
        <Span colorProp="white" levelProp={3} marginProp={['0', '0', '4%', '0']}>
          잠시 후 게임이 자동으로 시작됩니다
        </Span>
        <TableMedia widthprop="100%" maxwidthprop="70%" colorprop="white">
          <thead>
            <tr>
              <TheadMedia paddingprop={['0', '0', '4%', '0']} colorprop="white">
                번호
              </TheadMedia>
              <TheadMedia paddingprop={['0', '0', '4%', '0']} colorprop="white">
                닉네임
              </TheadMedia>
              <TheadMedia paddingprop={['0', '0', '4%', '0']} colorprop="white">
                직업
              </TheadMedia>
              <TheadMedia paddingprop={['0', '0', '4%', '0']} colorprop="white">
                생사
              </TheadMedia>
            </tr>
          </thead>
          <tbody>
            {fixedRoom?.userList.map((user, index) => (
              <tr key={user.id}>
                <TdataMedia paddingprop={['4%', '0']} colorprop="white">
                  {index + 1}
                </TdataMedia>
                <TdataMedia paddingprop={['4%', '0']} colorprop="white">
                  {getUserFullName(user.firstName, user.lastName, user.nickname)}
                </TdataMedia>
                <TdataMedia
                  paddingprop={['4%', '0']}
                  colorprop={user.role === UserRole.Mafia ? 'red' : 'white'}
                >
                  {user.role === UserRole.Mafia ? '마피아' : '시민'}
                </TdataMedia>
                <TdataMedia paddingprop={['4%', '0']} colorprop={user.survive ? 'white' : 'red'}>
                  {user.survive ? '생존' : '사망'}
                </TdataMedia>
              </tr>
            ))}
          </tbody>
        </TableMedia>
      </S.Container>
    </S.Wrapper>
  );
};
