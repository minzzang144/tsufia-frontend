import React from 'react';
import styled from 'styled-components';

import { Header } from '@organisms/Header/Header';
import { Centralization } from '@templates/Centralization/Centralization';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 2rem;
  margin-bottom: 5%;

  @media ${({ theme }) => theme.device.laptop} {
    width: 70%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 90%;
  }
`;

export const ContactPagePresenter: React.FC = () => {
  return (
    <Centralization
      header={<Header isLoggedIn={false} colorProp="black" />}
      center={<Container></Container>}
      centerHeight="auto"
      isBackground={false}
    />
  );
};
