import React from 'react';

import { Header } from '@organisms/Header/Header';
import { Centralization } from '@templates/Centralization/Centralization';
import { useCreateRoomFormContext } from '@routers/LoginRouter';
import { useProfileUpdateContext } from '@pages/ProfileUpdatePage/ProfileUpdatePageContainer';
import { FormContainer } from '@organisms/FormContainer/FormContainer';

export const ProfileUpdatePagePresenter: React.FC = () => {
  const profileUpdateContext = useProfileUpdateContext();
  const createRoomFormContext = useCreateRoomFormContext();
  const { onToggleModal } = createRoomFormContext;
  return (
    <Centralization
      header={
        <Header isLoggedIn={true} where="CREATE" onToggleModal={onToggleModal} colorProp="black" />
      }
      center={
        <FormContainer
          where="profile-update"
          context={profileUpdateContext}
          modalContext={createRoomFormContext}
        />
      }
      isBackground={false}
    />
  );
};
