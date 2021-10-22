import React from 'react';

import * as I from '.';
import * as S from '@templates/Centralization/style';

export const Centralization: React.FC<I.CentralizationProps> = ({
  header,
  center,
  centerHeight,
  isBackground,
}) => (
  <S.Wrapper centerHeight={centerHeight}>
    <S.Header>{header}</S.Header>
    <S.Background isBackground={isBackground} />
    <S.Center centerHeight={centerHeight}>{center}</S.Center>
  </S.Wrapper>
);

Centralization.defaultProps = {
  header: <div></div>,
  center: <div></div>,
  centerHeight: '100vh',
};
