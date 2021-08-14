import React from 'react';

import * as I from '.';
import * as S from '@atoms/Button/style';

export const Button: React.FC<I.ButtonProps> = ({ children, ...rest }) => (
  <S.Wrapper {...rest}>{children}</S.Wrapper>
);

Button.defaultProps = {
  isValid: true,
  colorProp: I.ColorProp.Black,
  marginProp: ['0'],
  paddingProp: ['0'],
};
