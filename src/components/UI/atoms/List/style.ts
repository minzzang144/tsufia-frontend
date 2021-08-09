import styled, { css } from 'styled-components';

import { ListColorProp, ListProps } from '@atoms/List';

type ColorPick = Pick<ListProps, 'colorProp'>;

const colorStyles = css<ColorPick>`
  ${({ colorProp }) =>
    colorProp === ListColorProp.Black &&
    css`
      color: ${({ theme }) => theme.color.dark};
    `}
  ${({ colorProp }) =>
    colorProp === ListColorProp.Black &&
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
