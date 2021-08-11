import React from 'react';

import { Header } from '@organisms/Header/Header';
import { Introduction } from '@organisms/Introduction/Introduction';
import { Authentication } from '@templates/Authentication/Authentication';
import { Login } from '@organisms/Login/Login';

export const LogoutHomePresenter = () => (
  <Authentication header={<Header />} leftSide={<Introduction />} rightSide={<Login />} />
);
