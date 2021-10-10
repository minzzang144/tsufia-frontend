import React from 'react';

import * as I from '.';
import * as S from '@templates/Authentication/style';

export const Authentication = React.forwardRef<HTMLDivElement, I.AuthenticationProps>(
  ({ header, leftSide, rightSide }, ref) => {
    return (
      <S.Wrapper>
        <S.Header>{header}</S.Header>
        <S.LeftSide>{leftSide}</S.LeftSide>
        <S.RightSide ref={ref}>{rightSide}</S.RightSide>
      </S.Wrapper>
    );
  },
);

Authentication.displayName = 'Authentication';

Authentication.defaultProps = {
  header: <div></div>,
  leftSide: <div></div>,
  rightSide: <div></div>,
};
