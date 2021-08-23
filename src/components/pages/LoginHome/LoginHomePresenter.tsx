import { Header } from '@organisms/Header/Header';
import { Room } from '@organisms/Room/Room';
import { useCreateRoomFormContext } from '@pages/LoginHome/LoginHomeContainer';
import { Centralization } from '@templates/Centralization/Centralization';
import React from 'react';

export const LoginHomePresenter: React.FC = () => {
  const { onToggleModal } = useCreateRoomFormContext();
  return (
    <Centralization
      header={
        <Header isLoggedIn={true} where="CREATE" onToggleModal={onToggleModal} colorProp="black" />
      }
      center={<Room />}
    />
  );
};
