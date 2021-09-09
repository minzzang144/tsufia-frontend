import React, { useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@molecules/UserList/style';

import { UserRole } from '@auth';
import { Img } from '@atoms/Img/Img';
import { Span } from '@atoms/Span/Span';
import { List } from '@atoms/List/List';
import { UnorderedList } from '@atoms/UnorderedList/UnorderedList';
import { RootState } from '@modules';
import { useRoomPageContext } from '@pages/RoomPage/RoomPageContainer';
import { Cycle } from '@game';

export const UserList: React.FC = () => {
  const { onUserListClick, selectCitizenId } = useRoomPageContext();
  const { loading, error, room, user } = useSelector(
    (state: RootState) => ({
      loading: state.room.loading,
      error: state.room.error,
      room: state.room.data,
      user: state.authentication.user,
    }),
    shallowEqual,
  );
  const currentUser = room && user && room.userList.find((listUser) => listUser.id === user.id);

  function getUserInitial(firstName: string, nickname: string) {
    let initial: string;
    if (firstName) {
      initial = firstName.substring(0).toUpperCase();
    } else {
      initial = nickname.substring(0).toUpperCase();
    }
    return initial;
  }

  const setBackground = useCallback((): 'gray' | 'initial' | undefined => {
    if (typeof room?.game?.cycle === 'number') {
      if (room.game?.cycle === Cycle.밤) {
        return currentUser?.role === UserRole.Mafia ? 'gray' : 'initial';
      }
    }
    return undefined;
  }, [room?.game?.cycle, currentUser?.role]);

  const setBorder = useCallback(
    (userId: number): boolean => {
      if (typeof room?.game?.cycle === 'number') {
        if (room.game?.cycle === Cycle.밤) {
          return currentUser?.role === UserRole.Mafia && selectCitizenId === userId ? true : false;
        }
      }
      return false;
    },
    [room?.game?.cycle, currentUser?.role, selectCitizenId],
  );

  const setClick = useCallback((): boolean => {
    if (typeof room?.game?.cycle === 'number') {
      if (room.game?.cycle === Cycle.밤) {
        return currentUser?.role === UserRole.Mafia ? true : false;
      }
    }
    return false;
  }, [room?.game?.cycle, currentUser?.role]);

  return (
    <React.Fragment>
      {loading === false && !error && (
        <S.Wrapper backgroundprop={setBackground()}>
          <UnorderedList
            flexDirection="row"
            justifyContentProp="space-evenly"
            alignItemsProp="center"
            widthProp="100%"
          >
            {room &&
              room.userList.map((user) => (
                <List
                  key={user.id}
                  displayprop="flex"
                  flexDirectionprop="column"
                  alignItemsprop="center"
                  onClick={setClick() ? () => onUserListClick(user.id) : undefined}
                  paddingProp={['0.5rem']}
                  borderprop={
                    setBorder(user.id)
                      ? { 'line-width': '2px', 'line-style': 'solid', color: 'white' }
                      : undefined
                  }
                  borderRadiusprop="4px"
                  cursorprop={setClick()}
                >
                  {user.photo && (
                    <Img src={user.photo} width="50px" height="50px" borderRadiusProp="50%" />
                  )}
                  {!user.photo && (
                    <Img
                      justifyContentprop="center"
                      alignItemsprop="center"
                      widthprop="50px"
                      heightprop="50px"
                      borderRadiusProp="50%"
                      colorprop="white"
                    >
                      {getUserInitial(user.firstName, user.nickname)}
                    </Img>
                  )}
                  {user.firstName && (
                    <Span levelProp={6}>
                      {user.firstName} {user.lastName}
                    </Span>
                  )}
                  {user.nickname && <Span>{user.nickname}</Span>}
                </List>
              ))}
          </UnorderedList>
        </S.Wrapper>
      )}
    </React.Fragment>
  );
};
