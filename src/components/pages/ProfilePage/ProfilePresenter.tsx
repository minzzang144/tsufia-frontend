import React from 'react';

import { Header } from '@organisms/Header/Header';
import { Profile } from '@organisms/Profile/Profile';
import { Centralization } from '@templates/Centralization/Centralization';
import { useCreateRoomFormContext } from '@routers/LoginRouter';

export const ProfilePagePresenter: React.FC = () => {
  const { onToggleModal } = useCreateRoomFormContext();
  return (
    <Centralization
      header={
        <Header isLoggedIn={true} where="CREATE" onToggleModal={onToggleModal} colorProp="black" />
      }
      center={<Profile />}
      isBackground={false}
    />
  );
};
