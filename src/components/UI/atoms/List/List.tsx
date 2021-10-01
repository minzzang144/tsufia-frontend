import React from 'react';

import * as I from '.';
import * as S from '@atoms/List/style';

export const List: React.FC<I.ListProps> = ({ children, to, onClick, ...rest }) => (
  <React.Fragment>
    {to ? (
      <S.Wrapper {...rest}>
        <S.Linked to={to}>{children}</S.Linked>
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
