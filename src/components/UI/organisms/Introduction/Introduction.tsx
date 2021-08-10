import React from 'react';

import { Button } from '@atoms/Button/Button';
import { Heading } from '@atoms/Heading/Heading';
import { Paragraph } from '@atoms/Paragraph/Paragraph';
import { ButtonList } from '@molecules/ButtonList/ButtonList';

import * as IButton from '@atoms/Button/index';
import * as S from '@organisms/Introduction/style';

export const Introduction = () => (
  <S.Wrapper>
    <Heading levelProp={1} marginProp={['0', '0', '0.57142em']}>
      Tsufia
    </Heading>
    <Paragraph>
      Tsufia에 오신 것을 환영합니다. 게임을 바로 시작하시길 원하시는 분들은 회원가입 또는 로그인을
      진행하시고 Tsufia에 처음 방문하신 분들은 아래의 게임소개와 설명 버튼을 참고하시기 바랍니다.
    </Paragraph>
    <ButtonList gap={['10px']}>
      <Button colorProp={IButton.ColorProp.White}>게임 소개</Button>
      <Button>게임 설명</Button>
    </ButtonList>
  </S.Wrapper>
);
