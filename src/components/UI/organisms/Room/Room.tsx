import React from 'react';
import { useSelector } from 'react-redux';

import * as S from '@organisms/Room/style';

import { List } from '@atoms/List/List';
import { Span } from '@atoms/Span/Span';
import { UnorderedList } from '@molecules/UnorderedList/UnorderedList';
import { FormModal } from '@molecules/FormModal/FormModal';
import { RootState } from '@modules';

export const Room: React.FC = () => {
  const rooms = useSelector((state: RootState) => state.rooms.data);

  return (
    <S.Wrapper>
      <FormModal />
      {rooms &&
        rooms.map((room) => (
          <S.RoomContainer key={room.id}>
            <Span levelProp={2} marginProp={['1rem', '0', '0', '0']}>
              {room.status}
            </Span>
            <Span
              levelProp={2}
              alignSelfProp="flex-start"
              marginProp={['1rem', '0', '1rem', '2rem']}
            >
              {room.title}
            </Span>
            <Span levelProp={4}>
              {room.currentHeadCount} / {room.totalHeadCount}
            </Span>
            <UnorderedList>
              {room.userList &&
                room.userList.map((user) => (
                  <List key={user.id} paddingProp={['1rem', '2rem']} colorProp="black">
                    {user.email}
                  </List>
                ))}
            </UnorderedList>
          </S.RoomContainer>
        ))}
    </S.Wrapper>
  );
};
