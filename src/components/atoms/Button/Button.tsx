import React from 'react';

import * as I from '.';
import * as S from '@atoms/Button/style';

export const Button: React.FC<I.ButtonProps> = ({ children, ...rest }) => (
  <S.Wrapper {...rest}>{children}</S.Wrapper>
);

Button.defaultProps = {
  color: I.ColorProp.Black,
};
