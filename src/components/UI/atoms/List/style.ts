import styled, { css } from 'styled-components';

import * as I from '.';

type ColorPick = Pick<I.ListProps, 'colorProp'>;

const colorStyles = css<ColorPick>`
  ${({ colorProp }) =>
    colorProp === I.ColorProp.Black &&
    css`
      color: ${({ theme }) => theme.color.dark};
    `}
  ${({ colorProp }) =>
    colorProp === I.ColorProp.Black &&
    css`
      color: ${({ theme }) => theme.color.light};
    `}
`;

export const Wrapper = styled.li`
  padding: 1rem 2rem;
  list-style: none;

  /* Color Styles */
  ${colorStyles}
`;
