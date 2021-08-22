import styled from 'styled-components';

import MainPoster from '@assets/room-container.jpg';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const Header = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
`;

export const Background = styled.div`
  position: fixed;
  top: 5rem;
  left: 0;
  right: 0;
  background-image: url(${MainPoster});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: 100vh;
  z-index: -1;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
