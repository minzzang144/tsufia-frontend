import React from 'react';

import * as S from '@molecules/GameResult/style';

export const GameResult: React.FC = () => {
  return (
    <S.Wrapper visible={true}>
      <S.Container>
        <S.CancelIconed />
      </S.Container>
    </S.Wrapper>
  );
};
