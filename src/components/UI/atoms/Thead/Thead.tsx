import React from 'react';

import * as I from '.';
import * as S from '@atoms/Thead/style';

export const Thead: React.FC<I.TheadProps> = ({ children, ...rest }) => {
  return <S.Wrapper {...rest}>{children}</S.Wrapper>;
};
