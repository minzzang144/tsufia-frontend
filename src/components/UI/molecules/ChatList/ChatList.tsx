import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@molecules/ChatList/style';

import { UnorderedList } from '@atoms/UnorderedList/UnorderedList';
import { List } from '@atoms/List/List';
import { Img } from '@atoms/Img/Img';
import { Span } from '@atoms/Span/Span';
import { Paragraph } from '@atoms/Paragraph/Paragraph';
import { User, UserRole } from '@auth';
import { Chat } from '@chats';
import { RootState } from '@modules';

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

  function renderFilteringChats() {
    if (currentUser?.role !== UserRole.Mafia) {
      Chats = chats?.filter((chat) => chat.user.role !== UserRole.Mafia);
    } else {
      Chats = chats;
    }
    return Chats;
  }

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
              borderprop={{ 'line-width': '1px', 'line-style': 'solid', color: 'white' }}
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
