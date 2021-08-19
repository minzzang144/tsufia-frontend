import styled from 'styled-components';

import MainPoster from '@assets/main-poster.jpg';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 5rem auto 0;
  width: 70%;
  background-image: url(${MainPoster});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

export const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
