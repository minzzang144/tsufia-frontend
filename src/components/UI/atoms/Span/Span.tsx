import React from 'react';

import * as I from '.';
import * as S from '@atoms/Span/style';
import styled from 'styled-components';

export const Span: React.FC<I.SpanProps> = ({ children, onClick, ...rest }) => (
  <React.Fragment>
    {onClick ? (
      <S.Wrapper onClick={(e) => onClick(e)} {...rest}>
        {children}
      </S.Wrapper>
    ) : (
      <S.Wrapper {...rest}>{children}</S.Wrapper>
    )}
  </React.Fragment>
);

export const SpanWidthMedia = styled(Span)`
  @media ${({ theme }) => theme.device.mobile} {
    width: 90%;
  }
`;

Span.defaultProps = {
  levelProp: 4,
  displayProp: 'inline-block',
  marginProp: ['0'],
  colorProp: 'white',
  highlightProp: false,
};
