import React, { useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@molecules/UserList/style';

import { UserRole } from '@auth';
import { Img } from '@atoms/Img/Img';
import { Span } from '@atoms/Span/Span';
import { List } from '@atoms/List/List';
import { UnorderedList } from '@atoms/UnorderedList/UnorderedList';
import { Cycle } from '@game';
import { RootState } from '@modules';
import { useRoomPageContext } from '@pages/RoomPage/RoomPageContainer';

export const UserList: React.FC = () => {
  const { onUserListClick, selectCitizenId, selectUserId } = useRoomPageContext();
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
    (userId: number, survive: boolean): boolean => {
      if (typeof room?.game?.cycle === 'number') {
        if (room.game.cycle === Cycle.밤) {
          return currentUser?.role === UserRole.Mafia && selectCitizenId === userId ? true : false;
        }
        if (room.game.cycle === Cycle.낮) {
          return survive && selectUserId === userId ? true : false;
        }
      }
      return false;
    },
    [room?.game?.cycle, currentUser?.role, selectCitizenId, selectUserId],
  );

  const setClick = useCallback(
    (userRole: UserRole, survive: boolean): boolean => {
      if (typeof room?.game?.cycle === 'number') {
        if (room.game.cycle === Cycle.밤) {
          return currentUser?.role === UserRole.Mafia && userRole !== UserRole.Mafia ? true : false;
        }
        if (room.game.cycle === Cycle.낮) {
          return survive ? true : false;
        }
      }
      return false;
    },
    [room?.game?.cycle, currentUser?.role],
  );

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
                  positionprop="relative"
                  displayprop="flex"
                  flexDirectionprop="column"
                  alignItemsprop="center"
                  onClick={
                    setClick(user.role, user.survive)
                      ? () => onUserListClick(user.id, room.game.cycle)
                      : undefined
                  }
                  paddingProp={['0.5rem']}
                  borderprop={
                    setBorder(user.id, user.survive)
                      ? { 'line-width': '2px', 'line-style': 'solid', color: 'white' }
                      : undefined
                  }
                  borderRadiusprop="4px"
                  cursorprop={setClick(user.role, user.survive)}
                >
                  {user.survive === false && (
                    <Span
                      positionprop="absolute"
                      topprop="30%"
                      displayProp="inline-block"
                      levelProp={2}
                      fontweightprop="600"
                      marginProp={['0']}
                      colorProp="red"
                    >
                      사망
                    </Span>
                  )}
                  {user.photo && (
                    <Img
                      src={user.photo}
                      width="50px"
                      height="50px"
                      borderRadiusProp="50%"
                      opacityprop={user.survive === false ? '0.2' : undefined}
                    />
                  )}
                  {!user.photo && (
                    <Img
                      justifyContentprop="center"
                      alignItemsprop="center"
                      widthprop="50px"
                      heightprop="50px"
                      borderRadiusProp="50%"
                      colorprop="white"
                      opacityprop={user.survive === false ? '0.2' : undefined}
                    >
                      {getUserInitial(user.firstName, user.nickname)}
                    </Img>
                  )}
                  {user.firstName && (
                    <Span levelProp={6} opacityprop={user.survive === false ? '0.5' : undefined}>
                      {user.firstName} {user.lastName}
                    </Span>
                  )}
                  {user.nickname && (
                    <Span opacityprop={user.survive === false ? '0.5' : undefined}>
                      {user.nickname}
                    </Span>
                  )}
                </List>
              ))}
          </UnorderedList>
        </S.Wrapper>
      )}
    </React.Fragment>
  );
};
