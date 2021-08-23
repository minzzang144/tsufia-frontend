import React from 'react';

import { Game } from '@organisms/Game/Game';
import { Header } from '@organisms/Header/Header';
import { useUpdateRoomFormContext } from '@pages/RoomPage/RoomPageContainer';
import { Centralization } from '@templates/Centralization/Centralization';

export const RoomPagePresenter: React.FC = () => {
  const { onToggleModal } = useUpdateRoomFormContext();
  return (
    <Centralization
      header={
        <Header isLoggedIn={true} where="UPDATE" colorProp="black" onToggleModal={onToggleModal} />
      }
      center={<Game />}
      isBackground={false}
    />
  );
};
