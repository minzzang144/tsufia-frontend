import React from 'react';
import styled from 'styled-components';

import { Header } from '@organisms/Header/Header';
import { Centralization } from '@templates/Centralization/Centralization';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 2rem;
  margin-bottom: 5%;
`;

export const ExplanationPresenter: React.FC = () => {
  return (
    <Centralization
      header={<Header isLoggedIn={false} colorProp="black" />}
      center={<Container></Container>}
      centerHeight="auto"
      isBackground={false}
    />
  );
};
