import styled, { css } from 'styled-components';

import * as I from '.';

type BackgroundPick = Pick<I.GameProps, 'backgroundImgprop'>;

const backgroundStyles = css<BackgroundPick>`
  ${({ backgroundImgprop }) =>
    backgroundImgprop &&
    css`
      background-image: url(${backgroundImgprop.image});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: ${backgroundImgprop.size};
    `}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: calc(100vh - 6rem);

  /* Background Styles */
  ${backgroundStyles}
`;
