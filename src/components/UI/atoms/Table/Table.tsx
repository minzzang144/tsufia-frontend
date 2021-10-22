import React from 'react';
import styled from 'styled-components';

import * as I from '.';
import * as S from '@atoms/Table/style';

export const Table: React.FC<I.TableProps> = ({ children, ...rest }) => {
  return <S.Wrapper {...rest}>{children}</S.Wrapper>;
};

export const TableMedia = styled(Table)`
  @media ${({ theme }) => theme.device.laptop} {
    max-width: 70%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    max-width: 90%;
  }
`;
