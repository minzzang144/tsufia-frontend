import React from 'react';

import * as I from '.';
import * as S from '@atoms/List/style';
import { Link } from 'react-router-dom';

export const List: React.FC<I.ListProps> = ({ children, to, ...rest }) => (
  <React.Fragment>
    {to ? (
      <S.Wrapper {...rest}>
        <Link to={to}>{children}</Link>
      </S.Wrapper>
    ) : (
      <S.Wrapper>{children}</S.Wrapper>
    )}
  </React.Fragment>
);

List.defaultProps = {
  colorProp: I.ColorProp.White,
};
