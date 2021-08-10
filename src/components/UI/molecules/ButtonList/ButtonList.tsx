import React from 'react';

import * as I from '.';
import * as S from '@molecules/ButtonList/style';

export const ButtonList: React.FC<I.ButtonListProps> = ({ children, ...rest }) => (
  <S.Wrapper {...rest}>{children}</S.Wrapper>
);

ButtonList.defaultProps = {
  flexDirection: I.FlexDirectionProp.Row,
};
