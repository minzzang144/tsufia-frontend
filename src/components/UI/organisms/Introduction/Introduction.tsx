import React from 'react';

import { Heading } from '@atoms/Heading/Heading';
import { Paragraph } from '@atoms/Paragraph/Paragraph';
import { ButtonList } from '@molecules/ButtonList/ButtonList';
import { Button } from '@atoms/Button/Button';

import * as IButton from '@atoms/Button/index';
import * as S from '@organisms/Introduction/style';

export const Introduction = () => (
  <S.Wrapper>
    <Heading level={1}>Tsufia</Heading>
    <Paragraph>
      Tsufia에 오신 것을 환영합니다. 게임을 바로 시작하시길 원하시는 분들은 회원가입 또는 로그인을
      진행하시기 바랍니다. 게임을 처음 접하시거나 아직 익숙하지 않으신 분들은 아래의 게임소개와 설명
      버튼을 참고하십시오.
    </Paragraph>
    <ButtonList>
      <Button colorProp={IButton.ColorProp.White}>게임 소개</Button>
      <Button>게임 설명</Button>
    </ButtonList>
  </S.Wrapper>
);
