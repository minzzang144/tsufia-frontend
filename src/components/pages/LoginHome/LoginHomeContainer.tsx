import React, { useEffect } from 'react';

import socket from '@/socket';
import { LoginHomePresenter } from '@pages/LoginHome/LoginHomePresenter';

export const LoginHomeContainer: React.FC = () => {
  useEffect(() => {
    socket.emit('rooms:test:server', 'rooms');
  }, []);

  return <LoginHomePresenter />;
};
