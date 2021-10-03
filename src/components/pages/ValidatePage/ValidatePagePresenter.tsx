import React from 'react';

import { Header } from '@organisms/Header/Header';
import { useCreateRoomFormContext } from '@routers/LoginRouter';
import { Centralization } from '@templates/Centralization/Centralization';

export const ValidatePagePresenter: React.FC = () => {
  const { onToggleModal } = useCreateRoomFormContext();
  return (
    <Centralization
      header={
        <Header isLoggedIn={true} where="CREATE" onToggleModal={onToggleModal} colorProp="black" />
      }
      center={<div></div>}
      isBackground={false}
    />
  );
};
