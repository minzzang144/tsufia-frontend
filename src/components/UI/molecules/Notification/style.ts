import styled, { css } from 'styled-components';

import * as I from '.';

type TopPick = Pick<I.NotificationProps, 'topprop'>;

const topStyles = css<TopPick>`
  ${({ topprop }) => css`
    top: ${topprop};
  `}
`;

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 70%;

  /* Top Styles */
  ${topStyles}
`;
