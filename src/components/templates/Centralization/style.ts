import styled, { css } from 'styled-components';

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

export const Background = styled.div<{ isBackground: boolean }>`
  position: fixed;
  top: 5rem;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  ${({ isBackground }) => {
    switch (isBackground) {
      case true:
        return css`
          background-image: url(${MainPoster});
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
        `;
      case false:
        return css`
          background-color: ${({ theme }) => theme.color.darkGray};
        `;
      default:
        break;
    }
  }}
`;

export const Center = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 0;
  padding-top: 5rem;
`;
