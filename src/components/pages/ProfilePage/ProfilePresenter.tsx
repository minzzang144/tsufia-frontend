import React from 'react';

import { useLoginContext } from '@/App';
import { Header } from '@organisms/Header/Header';
import { Profile } from '@organisms/Profile/Profile';
import { Centralization } from '@templates/Centralization/Centralization';

export const ProfilePagePresenter: React.FC = () => {
  const { onToggleModal } = useLoginContext();
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
