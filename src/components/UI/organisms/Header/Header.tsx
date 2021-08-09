import React from 'react';

import * as S from '@organisms/Header/style';

import { List } from '@atoms/List/List';
import { UnorderedList } from '@molecules/UnorderedList/UnorderedList';

export const Header = () => (
  <S.Wrapper>
    <UnorderedList>
      <List>게임 소개</List>
      <List>게임 설명</List>
    </UnorderedList>
  </S.Wrapper>
);
