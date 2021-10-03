import React from 'react';

import { Header } from '@organisms/Header/Header';
import { useCreateRoomFormContext } from '@routers/LoginRouter';
import { Centralization } from '@templates/Centralization/Centralization';
import { FormContainer } from '@organisms/FormContainer/FormContainer';
import { useValidateContext } from '@pages/ValidatePage/ValidatePageContainer';

export const ValidatePagePresenter: React.FC = () => {
  const validateContext = useValidateContext();
  const { onToggleModal } = useCreateRoomFormContext();
  return (
    <Centralization
      header={
        <Header isLoggedIn={true} where="CREATE" onToggleModal={onToggleModal} colorProp="black" />
      }
      center={<FormContainer where="validate-password" context={validateContext} />}
      isBackground={false}
    />
  );
};
