import React from 'react';

import * as I from '.';
import * as S from '@templates/Authentication/style';

export const Authentication: React.FC<I.AuthenticationProps> = ({ leftSide, rightSide }) => (
  <S.Wrapper>
    <S.LeftSide>{leftSide}</S.LeftSide>
    <S.RightSide>{rightSide}</S.RightSide>
  </S.Wrapper>
);

Authentication.defaultProps = {
  leftSide: <div></div>,
  rightSide: <div></div>,
};
