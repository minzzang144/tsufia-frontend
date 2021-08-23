import { Header } from '@organisms/Header/Header';
import { Centralization } from '@templates/Centralization/Centralization';
import React from 'react';

export const RoomPagePresenter: React.FC = () => {
  return (
    <Centralization
      header={<Header isLoggedIn={true} where="UPDATE" colorProp="black" />}
      center={<div></div>}
      isBackground={false}
    />
  );
};
