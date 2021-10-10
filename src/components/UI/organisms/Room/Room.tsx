import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@organisms/Room/style';

import { List } from '@atoms/List/List';
import { Span } from '@atoms/Span/Span';
import { UnorderedList } from '@atoms/UnorderedList/UnorderedList';
import { FormModal } from '@molecules/FormModal/FormModal';
import { RootState } from '@modules';
import { useCreateRoomFormContext } from '@routers/LoginRouter';
import { Status } from '@room';

export const Room: React.FC = () => {
  const createRoomFormContext = useCreateRoomFormContext();
  const { onRoomClick } = createRoomFormContext;
  const { loading, error, rooms } = useSelector(
    (state: RootState) => ({
      loading: state.rooms.loading,
      error: state.rooms.error,
      rooms: state.rooms.data,
    }),
    shallowEqual,
  );

  function setStatus(status: Status): string | undefined {
    switch (status) {
      case Status.대기중:
        return '대기중';
      case Status.진행중:
        return '진행중';
      case Status.완료:
        return '종료';
      default:
        break;
    }
  }

  return (
    <S.Wrapper>
      <FormModal
        formContext={createRoomFormContext}
        title="방 만들기"
        defaultValue={{ input: '', radio: '' }}
      />
      {loading === true && <S.Loader type="balls" color="white" width="5%" height="5%" />}
      {loading === false && rooms && !error ? (
        rooms?.map((room) => (
          <S.RoomContainer onClick={() => onRoomClick(room)} key={room.id}>
            <Span levelProp={2} marginProp={['1rem', '0', '0', '0']}>
              {room.status === 0 ? '대기중' : '진행중'}
            </Span>
            <Span levelProp={2} marginProp={['1rem']}>
              {room.title}
            </Span>
            <Span
              levelProp={3}
              colorProp={setStatus(room.status) === '진행중' ? 'red' : 'white'}
              opacityprop={setStatus(room.status) === '종료' ? '0.7' : '1'}
            >
              {`${room.currentHeadCount} / ${room.totalHeadCount}(${setStatus(room.status)})`}
            </Span>
            <UnorderedList>
              {room.userList?.map((user) => (
                <List key={user.id} paddingProp={['1rem', '2rem']} colorprop="black">
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
