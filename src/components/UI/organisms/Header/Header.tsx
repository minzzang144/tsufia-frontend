import React from 'react';

import * as I from '.';
import * as S from '@organisms/Header/style';

import { List } from '@atoms/List/List';
import { UnorderedList } from '@molecules/UnorderedList/UnorderedList';

export const Header: React.FC<I.HeaderProps> = ({ isLoggedIn }) => (
  <S.Wrapper>
    <>
      {isLoggedIn === false && (
        <UnorderedList>
          <List colorProp="black" paddingProp={['2rem', '1.5rem']}>
            게임 소개
          </List>
          <List colorProp="black" paddingProp={['2rem', '1.5rem']}>
            게임 설명
          </List>
          <List colorProp="black" paddingProp={['2rem', '3rem', '2rem', '1.5rem']}>
            연락하기
          </List>
        </UnorderedList>
      )}
      {isLoggedIn === true && (
        <UnorderedList>
          <List colorProp="black" paddingProp={['2rem', '1.5rem']}>
            프로필
          </List>
          <List colorProp="black" paddingProp={['2rem', '3rem', '2rem', '1.5rem']}>
            로그아웃
          </List>
        </UnorderedList>
      )}
    </>
  </S.Wrapper>
);
