import React from 'react';

import * as I from '.';
import * as S from '@templates/Centralization/style';

export const Centralization: React.FC<I.CentralizationProps> = ({ header, center }) => (
  <S.Wrapper>
    <S.Header>{header}</S.Header>
    <S.Center>{center}</S.Center>
  </S.Wrapper>
);

Centralization.defaultProps = {
  header: <div></div>,
  center: <div></div>,
};
