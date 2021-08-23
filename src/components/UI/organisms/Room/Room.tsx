import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@organisms/Room/style';

import { List } from '@atoms/List/List';
import { Span } from '@atoms/Span/Span';
import { UnorderedList } from '@molecules/UnorderedList/UnorderedList';
import { FormModal } from '@molecules/FormModal/FormModal';
import { RootState } from '@modules';
import { useCreateRoomFormContext } from '@pages/LoginHome/LoginHomeContainer';

export const Room: React.FC = () => {
  const createRoomFormContext = useCreateRoomFormContext();
  const { loading, error, rooms } = useSelector(
    (state: RootState) => ({
      loading: state.rooms.loading,
      error: state.rooms.error,
      rooms: state.rooms.data,
    }),
    shallowEqual,
  );

  return (
    <S.Wrapper>
      <FormModal roomFormContext={createRoomFormContext} title="방 만들기" />
      {loading === true && <S.Loader type="balls" color="white" width="5%" height="5%" />}
      {loading === false && rooms && !error ? (
        rooms?.map((room) => (
          <S.RoomContainer key={room.id}>
            <Span levelProp={2} marginProp={['1rem', '0', '0', '0']}>
              {room.status === 0 ? '대기중' : '진행중'}
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
              {room.userList?.map((user) => (
                <List key={user.id} paddingProp={['1rem', '2rem']} colorProp="black">
                  {user.firstName ? `${user.firstName} ${user.lastName}` : `${user.nickname}`}
                </List>
              ))}
            </UnorderedList>
          </S.RoomContainer>
        ))
      ) : (
        <S.ErrorPart>{error}</S.ErrorPart>
      )}
    </S.Wrapper>
  );
};
