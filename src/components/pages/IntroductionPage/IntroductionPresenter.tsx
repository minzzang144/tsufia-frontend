import React from 'react';

import { Header } from '@organisms/Header/Header';
import { Centralization } from '@templates/Centralization/Centralization';

export const IntroductionPresenter: React.FC = () => {
  return (
    <Centralization
      header={<Header isLoggedIn={false} colorProp="black" />}
      center={<div></div>}
      isBackground={false}
    />
  );
};
