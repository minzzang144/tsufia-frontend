import styled from 'styled-components';

import MainPoster from '@assets/main-poster.jpg';
import SubPoster from '@assets/sub-poster.jpg';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;

  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
  }
`;

export const Header = styled.div`
  display: flex;
  position: absolute;
  width: 30%;
  min-width: 450px;
  top: 0;
  right: 0;

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    min-width: auto;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5%;
  width: 70%;
  height: 100vh;
  background-image: url(${MainPoster});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

export const RightSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  min-width: 450px;
  height: 100vh;
  background-image: url(${SubPoster});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    min-width: auto;
  }
`;
