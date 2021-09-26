import React from 'react';

import * as I from '.';
import * as S from '@atoms/Table/style';

export const Table: React.FC<I.TableProps> = ({ children, ...rest }) => {
  return <S.Wrapper {...rest}>{children}</S.Wrapper>;
};
