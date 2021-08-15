import React from 'react';

import * as S from '@organisms/Header/style';

import { List } from '@atoms/List/List';
import { UnorderedList } from '@molecules/UnorderedList/UnorderedList';

export const Header = () => (
  <S.Wrapper>
    <UnorderedList>
      <List colorProp="black" paddingProp={['1rem', '2rem']}>
        게임 소개
      </List>
      <List colorProp="black" paddingProp={['1rem', '2rem']}>
        게임 설명
      </List>
    </UnorderedList>
  </S.Wrapper>
);
