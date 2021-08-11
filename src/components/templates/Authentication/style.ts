import styled from 'styled-components';

import MainPoster from '@assets/main-poster.jpg';
import SubPoster from '@assets/sub-poster.jpg';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5%;
  width: 70%;
  background-image: url(${MainPoster});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

export const RightSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  min-width: 450px;
  background-image: url(${SubPoster});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;
