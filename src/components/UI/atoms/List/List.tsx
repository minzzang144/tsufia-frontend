import React from 'react';

import * as I from '.';
import * as S from '@atoms/List/style';
import { Link } from 'react-router-dom';

export const List: React.FC<I.ListProps> = ({ children, to, onClick, ...rest }) => (
  <React.Fragment>
    {to ? (
      <S.Wrapper {...rest}>
        <Link to={to}>{children}</Link>
      </S.Wrapper>
    ) : (
      <S.Wrapper onClick={() => onClick && onClick()} {...rest}>
        {children}
      </S.Wrapper>
    )}
  </React.Fragment>
);

List.defaultProps = {
  colorProp: 'white',
  paddingProp: ['0'],
};
