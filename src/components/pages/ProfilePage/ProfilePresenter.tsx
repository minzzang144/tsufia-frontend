import React from 'react';

import { Header } from '@organisms/Header/Header';
import { Profile } from '@organisms/Profile/Profile';
import { Centralization } from '@templates/Centralization/Centralization';

export const ProfilePagePresenter: React.FC = () => {
  return (
    <Centralization
      header={<Header isLoggedIn={true} where="CREATE" colorProp="black" />}
      center={<Profile />}
    />
  );
};
