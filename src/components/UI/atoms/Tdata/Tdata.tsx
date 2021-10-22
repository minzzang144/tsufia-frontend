import React from 'react';
import styled from 'styled-components';

import * as I from '.';

import * as S from '@atoms/Tdata/style';

export const Tdata: React.FC<I.TdataProps> = ({ children, ...rest }) => {
  return <S.Wrapper {...rest}>{children}</S.Wrapper>;
};

export const TdataMedia = styled(Tdata)`
  @media ${({ theme }) => theme.device.laptop} {
    padding: 5% 0 !important;
  }
  @media ${({ theme }) => theme.device.mobile} {
    padding: 6% 0 !important;
  }
`;
