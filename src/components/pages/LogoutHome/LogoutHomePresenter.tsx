import React from 'react';

import { Header } from '@organisms/Header/Header';
import { Introduction } from '@organisms/Introduction/Introduction';
import { Authentication } from '@templates/Authentication/Authentication';

export const LogoutHomePresenter = () => (
  <Authentication header={<Header />} leftSide={<Introduction />} />
);
