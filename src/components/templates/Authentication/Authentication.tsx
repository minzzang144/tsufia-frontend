import React from 'react';

import * as I from '.';
import * as S from '@templates/Authentication/style';

export const Authentication: React.FC<I.AuthenticationProps> = ({
  header,
  leftSide,
  rightSide,
}) => (
  <S.Wrapper>
    <S.Header>{header}</S.Header>
    <S.LeftSide>{leftSide}</S.LeftSide>
    <S.RightSide>{rightSide}</S.RightSide>
  </S.Wrapper>
);

Authentication.defaultProps = {
  header: <div></div>,
  leftSide: <div></div>,
  rightSide: <div></div>,
};
