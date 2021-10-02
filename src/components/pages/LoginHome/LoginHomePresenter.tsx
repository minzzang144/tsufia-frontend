import React from 'react';

import { Header } from '@organisms/Header/Header';
import { Room } from '@organisms/Room/Room';
import { Centralization } from '@templates/Centralization/Centralization';
import { useCreateRoomFormContext } from '@routers/LoginRouter';

export const LoginHomePresenter: React.FC = () => {
  const { onToggleModal } = useCreateRoomFormContext();
  return (
    <Centralization
      header={
        <Header isLoggedIn={true} where="CREATE" onToggleModal={onToggleModal} colorProp="black" />
      }
      center={<Room />}
      isBackground={true}
    />
  );
};
