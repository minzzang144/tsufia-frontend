import styled from 'styled-components';

import MainPoster from '@assets/room-container.jpg';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
  align-items: center;
  margin: 1rem 0;
  border: 2px solid ${({ theme }) => theme.color.light};
  border-radius: 4px;
  width: 49%;
`;
