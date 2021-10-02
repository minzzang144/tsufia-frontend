import React from 'react';

import { useLoginContext } from '@/App';
import { Header } from '@organisms/Header/Header';
import { Room } from '@organisms/Room/Room';
import { Centralization } from '@templates/Centralization/Centralization';

export const LoginHomePresenter: React.FC = () => {
  const { onToggleModal } = useLoginContext();
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
