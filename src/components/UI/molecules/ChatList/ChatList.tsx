import React from 'react';
import { useSelector } from 'react-redux';

import * as S from '@molecules/ChatList/style';

import { UnorderedList } from '@atoms/UnorderedList/UnorderedList';
import { List } from '@atoms/List/List';
import { Img } from '@atoms/Img/Img';
import { Span } from '@atoms/Span/Span';
import { Paragraph } from '@atoms/Paragraph/Paragraph';
import { RootState } from '@modules';

export const ChatList: React.FC = () => {
  const chats = [
    {
      id: 1,
      content: '첫번째 채팅입니다',
      user: {
        id: 8,
        firstName: '이',
        lastName: '민찬',
        photo: null,
      },
    },
    {
      id: 2,
      content: '두번째 채팅입니다',
      user: {
        id: 9,
        nickname: '이민찬',
        photo:
          'https://lh3.googleusercontent.com/a/AATXAJxcU4N3yipGGfawh_17-Z3_uVVWJKtyvT4Aa4EU=s96-c',
      },
    },
    {
      id: 2,
      content: '두번째 채팅입니다',
      user: {
        id: 9,
        nickname: '이민찬',
        photo:
          'https://lh3.googleusercontent.com/a/AATXAJxcU4N3yipGGfawh_17-Z3_uVVWJKtyvT4Aa4EU=s96-c',
      },
    },
    {
      id: 2,
      content: '두번째 채팅입니다',
      user: {
        id: 9,
        nickname: '이민찬',
        photo:
          'https://lh3.googleusercontent.com/a/AATXAJxcU4N3yipGGfawh_17-Z3_uVVWJKtyvT4Aa4EU=s96-c',
      },
    },
    {
      id: 2,
      content: '두번째 채팅입니다',
      user: {
        id: 9,
        nickname: '이민찬',
        photo:
          'https://lh3.googleusercontent.com/a/AATXAJxcU4N3yipGGfawh_17-Z3_uVVWJKtyvT4Aa4EU=s96-c',
      },
    },
    {
      id: 2,
      content: '두번째 채팅입니다',
      user: {
        id: 9,
        nickname: '이민찬',
        photo:
          'https://lh3.googleusercontent.com/a/AATXAJxcU4N3yipGGfawh_17-Z3_uVVWJKtyvT4Aa4EU=s96-c',
      },
    },
    {
      id: 2,
      content: '두번째 채팅입니다',
      user: {
        id: 9,
        nickname: '이민찬',
        photo:
          'https://lh3.googleusercontent.com/a/AATXAJxcU4N3yipGGfawh_17-Z3_uVVWJKtyvT4Aa4EU=s96-c',
      },
    },
  ];
  const user = useSelector((state: RootState) => state.authentication.user);

  function getUserInitial(firstName: string, nickname: string) {
    let initial: string;
    if (firstName) {
      initial = firstName.substring(0).toUpperCase();
    } else {
      initial = nickname.substring(0).toUpperCase();
    }
    return initial;
  }

  return (
    <S.Wrapper>
      <UnorderedList flexDirection="column" justifyContentProp="flex-start" widthProp="100%">
        {chats &&
          chats.map((chat) => (
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
    </S.Wrapper>
  );
};
