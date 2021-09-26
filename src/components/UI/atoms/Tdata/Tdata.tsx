import React from 'react';

import * as I from '.';
import * as S from '@atoms/Tdata/style';

export const Tdata: React.FC<I.TdataProps> = ({ children, ...rest }) => {
  return <S.Wrapper {...rest}>{children}</S.Wrapper>;
};
