import React from 'react';

import * as I from '.';
import * as S from '@atoms/Alert/style';

export const Alert: React.FC<I.AlertProps> = ({ children, ...rest }) => (
  <S.Wrapper {...rest}>{children}</S.Wrapper>
);
