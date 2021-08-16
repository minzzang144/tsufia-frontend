import React from 'react';

import * as I from '.';
import * as S from '@atoms/Link/style';

export const Link: React.FC<I.LinkProps> = ({ children, ...rest }) => (
  <S.Wrapper {...rest}>{children}</S.Wrapper>
);

Link.defaultProps = {
  colorProp: 'white',
};
