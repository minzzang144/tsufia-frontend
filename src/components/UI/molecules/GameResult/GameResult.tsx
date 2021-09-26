import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@molecules/GameResult/style';

import { RootState } from '@modules';
import { Status } from '@room';

export const GameResult: React.FC = () => {
  const { room } = useSelector(
    (state: RootState) => ({
      room: state.room.data,
    }),
    shallowEqual,
  );
  return (
    <S.Wrapper visible={room?.status === Status.완료}>
      <S.Container>
        <S.CancelIconed />
      </S.Container>
    </S.Wrapper>
  );
};
