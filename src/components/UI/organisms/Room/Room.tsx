import React from 'react';

import * as S from '@organisms/Room/style';

import { List } from '@atoms/List/List';
import { Span } from '@atoms/Span/Span';
import { UnorderedList } from '@molecules/UnorderedList/UnorderedList';

export const Room: React.FC = () => {
  const rooms = [
    {
      id: 1,
      title: '테스트 방',
      currentHeadCount: 1,
      totalHeadCOunt: 4,
      status: '대기중',
      roomId: 1,
      userList: [
        {
          id: 1,
          name: '테스트유저1',
        },
        {
          id: 2,
          name: '테스트유저2',
        },
      ],
    },
  ];

  return (
    <S.Wrapper>
      {rooms.map((room) => (
        <S.RoomContainer key={room.id}>
          <Span levelProp={2} marginProp={['1rem', '0', '0', '0']}>
            {room.status}
          </Span>
          <Span levelProp={2} marginProp={['1rem', '0']}>
            {room.title}
          </Span>
          <Span levelProp={4}>
            {room.currentHeadCount} / {room.totalHeadCOunt}
          </Span>
          <UnorderedList>
            {room.userList.map((user) => (
              <List key={user.id} paddingProp={['1rem', '2rem']}>
                {user.name}
              </List>
            ))}
          </UnorderedList>
        </S.RoomContainer>
      ))}
    </S.Wrapper>
  );
};
