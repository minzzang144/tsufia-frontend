import React from 'react';

import * as I from '.';
import * as S from '@organisms/Header/style';

import SiteLogo from '@assets/site-logo.png';
import { List } from '@atoms/List/List';
import { UnorderedList } from '@molecules/UnorderedList/UnorderedList';
import { Img } from '@atoms/Img/Img';
import { Heading } from '@atoms/Heading/Heading';

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
        <S.SpaceBetween>
          <S.Logo>
            <Img src={SiteLogo} width="50px" height="50px" />
            <Heading levelProp={2} marginProp={['0', '0', '0', '1rem']}>
              Tsufia
            </Heading>
          </S.Logo>
          <UnorderedList>
            <List colorProp="black" paddingProp={['2rem', '1.5rem']}>
              프로필
            </List>
            <List colorProp="black" paddingProp={['2rem', '3rem', '2rem', '1.5rem']}>
              로그아웃
            </List>
          </UnorderedList>
        </S.SpaceBetween>
      )}
    </>
  </S.Wrapper>
);
