import React from 'react';

import * as I from '.';
import * as S from '@atoms/List/style';
import styled from 'styled-components';

export const List: React.FC<I.ListProps> = ({ children, onClick, ...rest }) => (
  <S.Wrapper onClick={() => onClick && onClick()} {...rest}>
    {children}
  </S.Wrapper>
);

export const ListMediaQuery = styled(List)`
  @media ${({ theme }) => theme.device.laptop} {
    max-width: 65%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    max-width: 80%;
  }
`;

List.defaultProps = {
  colorprop: 'white',
  paddingProp: ['0'],
  liststyleprop: 'none',
};
