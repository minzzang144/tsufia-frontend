import React, { createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import * as I from '.';

import { ProfilePagePresenter } from '@pages/ProfilePage/ProfilePresenter';

const ProfileContext = createContext<I.IProfileContext | undefined>(undefined);

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('Profile Context가 존재하지 않습니다');
  return context;
};

export const ProfilePageContainer: React.FC = () => {
  const history = useHistory();

  function onProfileUpdateClick(userId: number) {
    history.push(`/users/${userId}/validate-password`);
  }

  const value = {
    onProfileUpdateClick,
  };

  return (
    <ProfileContext.Provider value={value}>
      <ProfilePagePresenter />
    </ProfileContext.Provider>
  );
};
