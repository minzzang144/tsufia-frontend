import styled from 'styled-components';

import MainPoster from '@assets/main-poster.jpg';

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
  width: 70%;
  background-image: url(${MainPoster});
`;

export const RightSide = styled.div`
  width: 30%;
`;
