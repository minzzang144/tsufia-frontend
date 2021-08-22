import React from 'react';

import * as S from '@organisms/Room/style';

import { List } from '@atoms/List/List';
import { Span } from '@atoms/Span/Span';
import { UnorderedList } from '@molecules/UnorderedList/UnorderedList';
import { FormModal } from '@molecules/FormModal/FormModal';

export const Room: React.FC = () => {
  const rooms = [
    {
      id: 1,
      title: '테스트 방',
      currentHeadCount: 2,
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
    {
      id: 2,
      title: '테스트 방',
      currentHeadCount: 2,
      totalHeadCOunt: 6,
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
        {
          id: 3,
          name: '테스트유저3',
        },
        {
          id: 4,
          name: '테스트유저4',
        },
      ],
    },
    {
      id: 3,
      title: '테스트 방',
      currentHeadCount: 2,
      totalHeadCOunt: 6,
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
        {
          id: 3,
          name: '테스트유저3',
        },
        {
          id: 4,
          name: '테스트유저4',
        },
      ],
    },
  ];

  return (
    <S.Wrapper>
      <FormModal />
      {rooms.map((room) => (
        <S.RoomContainer key={room.id}>
          <Span levelProp={2} marginProp={['1rem', '0', '0', '0']}>
            {room.status}
          </Span>
          <Span levelProp={2} alignSelfProp="flex-start" marginProp={['1rem', '0', '1rem', '2rem']}>
            {room.title}
          </Span>
          <Span levelProp={4}>
            {room.currentHeadCount} / {room.totalHeadCOunt}
          </Span>
          <UnorderedList>
            {room.userList.map((user) => (
              <List key={user.id} paddingProp={['1rem', '2rem']} colorProp="black">
                {user.name}
              </List>
            ))}
          </UnorderedList>
        </S.RoomContainer>
      ))}
    </S.Wrapper>
  );
};
