import React, { useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@molecules/ChatList/style';

import { UnorderedList } from '@atoms/UnorderedList/UnorderedList';
import { BorderProp } from '@atoms/List';
import { List } from '@atoms/List/List';
import { Img } from '@atoms/Img/Img';
import { Span } from '@atoms/Span/Span';
import { Paragraph } from '@atoms/Paragraph/Paragraph';
import { User, UserRole } from '@auth';
import { Chat } from '@chats';
import { RootState } from '@modules';
import { Cycle } from '@game';

export const ChatList: React.FC = () => {
  const { loading, error, chats, user, room } = useSelector(
    (state: RootState) => ({
      loading: state.chats.loading,
      error: state.chats.error,
      chats: state.chats.data,
      user: state.authentication.user,
      room: state.room.data,
    }),
    shallowEqual,
  );
  let Chats: Chat[] | undefined;
  let currentUser: User | undefined;
  if (user && room) currentUser = room.userList.find((listUser) => listUser.id === user.id);

  function getUserInitial(firstName: string, nickname: string) {
    let initial: string;
    if (firstName) {
      initial = firstName.substring(0).toUpperCase();
    } else {
      initial = nickname.substring(0).toUpperCase();
    }
    return initial;
  }

  const renderFilteringChats = useCallback(() => {
    switch (room?.game?.cycle) {
      case null:
        return chats;
      case Cycle.밤:
        if (currentUser?.role === UserRole.Mafia) {
          Chats = chats?.filter(
            (chat) => chat.user.role === UserRole.Mafia || chat.user.survive === false,
          );
        } else {
          if (currentUser?.survive === true) {
            Chats = [];
          }
          if (currentUser?.survive === false) {
            Chats = chats?.filter(
              (chat) => chat.user.role === UserRole.Mafia || chat.user.survive === false,
            );
          }
        }
        return Chats;
      case Cycle.낮:
      case Cycle.저녁:
        if (currentUser?.survive === true) {
          Chats = chats?.filter((chat) => chat.user.survive === true && chat.cycle !== Cycle.밤);
        } else {
          Chats = chats?.filter((chat) => chat.user.survive === false);
        }
        return Chats;
      default:
        return chats;
    }
  }, [chats, room?.game?.cycle, currentUser]);

  const setBorder = useCallback((chat: Chat): BorderProp | undefined => {
    switch (chat.cycle) {
      case null:
      case Cycle.밤:
        if (chat.user.role === UserRole.Mafia)
          return { 'line-width': '1px', 'line-style': 'solid', color: 'red' };
        if (chat.user.survive === false)
          return { 'line-width': '1px', 'line-style': 'solid', color: 'rgba(255, 255, 255, 0.3)' };
        return { 'line-width': '1px', 'line-style': 'solid', color: 'white' };
      case Cycle.낮:
      case Cycle.저녁:
        if (chat.user.survive === false)
          return { 'line-width': '1px', 'line-style': 'solid', color: 'rgba(255, 255, 255, 0.3)' };
        return { 'line-width': '1px', 'line-style': 'solid', color: 'white' };
      default:
        break;
    }
  }, []);

  return (
    <S.Wrapper>
      {loading === false && !error && (
        <UnorderedList flexDirection="column" justifyContentProp="flex-start" widthProp="100%">
          {renderFilteringChats()?.map((chat) => (
            <List
              key={chat.id}
              displayprop="flex"
              alignItemsprop="flex-start"
              alignSelfprop={user && user.id === chat.user.id ? 'flex-end' : 'flex-start'}
              maxWidthprop="50%"
              marginprop={['0', '0', '1rem', '0']}
              paddingProp={['1rem']}
              borderprop={setBorder(chat)}
              borderRadiusprop="4px"
            >
              {chat.user.photo && (
                <Img
                  src={chat.user.photo}
                  marginprop={['0', '1rem', '0', '0']}
                  borderRadiusProp="50%"
                  width="50px"
                  height="50px"
                />
              )}
              {!chat.user.photo && (
                <Img
                  justifyContentprop="center"
                  alignItemsprop="center"
                  marginprop={['0', '1rem', '0', '0']}
                  borderRadiusProp="50%"
                  widthprop="50px"
                  heightprop="50px"
                  colorprop="white"
                >
                  {getUserInitial(chat.user.firstName ?? '', chat.user.nickname ?? '')}
                </Img>
              )}
              <S.Content>
                {chat.user.firstName && (
                  <Span displayProp="inline-block" levelProp={6} lineHeightprop="1">
                    {chat.user.firstName} {chat.user.lastName}
                  </Span>
                )}
                {chat.user.nickname && (
                  <Span displayProp="inline-block" levelProp={6} lineHeightprop="1">
                    {chat.user.nickname}
                  </Span>
                )}
                <Paragraph marginprop={['0.5rem', '0']}>{chat.content}</Paragraph>
              </S.Content>
            </List>
          ))}
        </UnorderedList>
      )}
      {loading === false && error ? (
        <Span displayProp="inline-block" levelProp={3}>
          {error}
        </Span>
      ) : null}
    </S.Wrapper>
  );
};
