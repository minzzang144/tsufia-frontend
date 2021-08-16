import React from 'react';

import * as I from '.';
import * as S from '@atoms/Span/style';

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

Span.defaultProps = {
  marginProp: ['0'],
  colorProp: 'white',
  highlightProp: false,
};
