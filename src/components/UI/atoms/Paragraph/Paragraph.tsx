import React from 'react';

import * as I from '.';
import * as S from '@atoms/Paragraph/style';

export const Paragraph: React.FC<I.ParagraphProps> = ({ children, ...rest }) => (
  <S.Wrapper {...rest}>{children}</S.Wrapper>
);

Paragraph.defaultProps = {
  marginprop: ['1rem', '0'],
  fontSizeProp: I.FontSizeProp.Medium,
  colorProp: I.ColorProp.White,
};
