import { Header } from '@organisms/Header/Header';
import { Room } from '@organisms/Room/Room';
import { Centralization } from '@templates/Centralization/Centralization';
import React from 'react';

export const LoginHomePresenter: React.FC = () => (
  <Centralization header={<Header isLoggedIn={true} colorProp="black" />} center={<Room />} />
);
