import React, { useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@molecules/GameResult/style';

import { Heading } from '@atoms/Heading/Heading';
import { Table } from '@atoms/Table/Table';
import { Tdata } from '@atoms/Tdata/Tdata';
import { Thead } from '@atoms/Thead/Thead';
import { RootState } from '@modules';
import { useRoomPageContext } from '@pages/RoomPage/RoomPageContainer';
import { Status } from '@room';
import { UserRole } from '@auth';

export const GameResult: React.FC = () => {
  const { mafiaCount, citizenCount, closeGameResult, onCloseGameResult } = useRoomPageContext();
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
  }, [room?.status]);

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
        <Heading levelProp={2} marginProp={['10%', '0']}>
          {setHeading()}
        </Heading>
        <Table widthprop="100%" maxWidthprop="70%" colorprop="white">
          <tr>
            <Thead paddingprop={['0', '0', '4%', '0']} colorprop="white">
              번호
            </Thead>
            <Thead paddingprop={['0', '0', '4%', '0']} colorprop="white">
              닉네임
            </Thead>
            <Thead paddingprop={['0', '0', '4%', '0']} colorprop="white">
              직업
            </Thead>
            <Thead paddingprop={['0', '0', '4%', '0']} colorprop="white">
              생사
            </Thead>
          </tr>
          {room?.userList.map((user, index) => (
            <tr key={user.id}>
              <Tdata paddingprop={['4%', '0']} colorprop="white">
                {index + 1}
              </Tdata>
              <Tdata paddingprop={['4%', '0']} colorprop="white">
                {getUserFullName(user.firstName, user.lastName, user.nickname)}
              </Tdata>
              <Tdata
                paddingprop={['4%', '0']}
                colorprop={user.role === UserRole.Mafia ? 'red' : 'white'}
              >
                {user.role === UserRole.Mafia ? '마피아' : '시민'}
              </Tdata>
              <Tdata paddingprop={['4%', '0']} colorprop={user.survive ? 'white' : 'red'}>
                {user.survive ? '생존' : '사망'}
              </Tdata>
            </tr>
          ))}
        </Table>
      </S.Container>
    </S.Wrapper>
  );
};
