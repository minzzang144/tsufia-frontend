import React from 'react';

import * as I from '.';
import * as S from '@atoms/List/style';

export const List: React.FC<I.ListProps> = ({ children, onClick, ...rest }) => (
  <S.Wrapper onClick={() => onClick && onClick()} {...rest}>
    {children}
  </S.Wrapper>
);

List.defaultProps = {
  colorprop: 'white',
  paddingProp: ['0'],
};
