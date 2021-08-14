import React from 'react';

import * as I from '.';
import * as S from '@atoms/Form/style';

export const Form: React.FC<I.FormProps> = ({ children, ...rest }) => {
  return <S.Wrapper {...rest}>{children}</S.Wrapper>;
};
