import React, { useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@molecules/GameResult/style';

import { Heading } from '@atoms/Heading/Heading';
import { RootState } from '@modules';
import { useRoomPageContext } from '@pages/RoomPage/RoomPageContainer';
import { Status } from '@room';
import { UnorderedList } from '@atoms/UnorderedList/UnorderedList';
import { List } from '@atoms/List/List';
import { UserRole } from '@auth';

export const GameResult: React.FC = () => {
  const { mafiaCount, citizenCount } = useRoomPageContext();
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
    <S.Wrapper visible={room?.status === Status.완료}>
      <S.Container>
        <S.CancelIconed />
        <Heading levelProp={2} marginProp={['10%', '0']}>
          {setHeading()}
        </Heading>
        <UnorderedList widthProp="100%" justifyContentProp="center">
          <List paddingProp={['2.5%', '7%']} colorProp="black">
            번호
          </List>
          <List paddingProp={['2.5%', '7%']} colorProp="black">
            닉네임
          </List>
          <List paddingProp={['2.5%', '7%']} colorProp="black">
            직업
          </List>
          <List paddingProp={['2.5%', '7%']} colorProp="black">
            생사
          </List>
        </UnorderedList>
        <UnorderedList flexDirection="column" widthProp="100%">
          {room?.userList.map((user, index) => (
            <List key={user.id}>
              <UnorderedList justifyContentProp="center">
                <List paddingProp={['2.5%', '7%']} colorProp="black">
                  {index + 1}
                </List>
                <List paddingProp={['2.5%', '7%']} colorProp="black">
                  {getUserFullName(user.firstName, user.lastName, user.nickname)}
                </List>
                <List paddingProp={['2.5%', '7%']} colorProp="black">
                  {user.role === UserRole.Mafia ? '마피아' : '시민'}
                </List>
                <List paddingProp={['2.5%', '7%']} colorProp="black">
                  {user.survive ? '생존' : '사망'}
                </List>
              </UnorderedList>
            </List>
          ))}
        </UnorderedList>
      </S.Container>
    </S.Wrapper>
  );
};
