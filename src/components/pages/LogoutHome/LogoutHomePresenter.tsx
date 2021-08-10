import React from 'react';

import { Introduction } from '@organisms/Introduction/Introduction';
import { Authentication } from '@templates/Authentication/Authentication';

export const LogoutHomePresenter = () => <Authentication leftSide={<Introduction />} />;
