import React from 'react';

import * as S from '@organisms/Game/style';

import { FormModal } from '@molecules/FormModal/FormModal';
import { useUpdateRoomFormContext } from '@pages/RoomPage/RoomPageContainer';

export const Game: React.FC = () => {
  const updateRoomFormContext = useUpdateRoomFormContext();

  return (
    <S.Wrapper>
      <FormModal roomFormContext={updateRoomFormContext} />
    </S.Wrapper>
  );
};
