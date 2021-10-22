import React from 'react';
import styled from 'styled-components';

import * as I from '.';

import * as S from '@atoms/Thead/style';

export const Thead: React.FC<I.TheadProps> = ({ children, ...rest }) => {
  return <S.Wrapper {...rest}>{children}</S.Wrapper>;
};

export const TheadMedia = styled(Thead)`
  @media ${({ theme }) => theme.device.laptop} {
    padding-bottom: 5% !important;
  }
  @media ${({ theme }) => theme.device.mobile} {
    padding-bottom: 6% !important;
  }
`;
