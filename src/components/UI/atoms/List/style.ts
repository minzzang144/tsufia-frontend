import styled, { css } from 'styled-components';

import * as I from '.';

type ColorPick = Pick<I.ListProps, 'colorProp'>;
type PaddingPick = Pick<I.ListProps, 'paddingProp'>;

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

const paddingStyles = css<PaddingPick>`
  ${({ paddingProp }) =>
    paddingProp &&
    paddingProp.length === 1 &&
    css`
      padding: 0;
      padding: ${paddingProp[0]};
    `}
  ${({ paddingProp }) =>
    paddingProp &&
    paddingProp.length === 2 &&
    css`
      padding: 0;
      padding: ${paddingProp[0]} ${paddingProp[1]};
    `}
  ${({ paddingProp }) =>
    paddingProp &&
    paddingProp.length === 3 &&
    css`
      padding: 0;
      padding: ${paddingProp[0]} ${paddingProp[1]} ${paddingProp[2]};
    `}
  ${({ paddingProp }) =>
    paddingProp &&
    paddingProp.length === 4 &&
    css`
      padding: 0;
      padding: ${paddingProp[0]} ${paddingProp[1]} ${paddingProp[2]} ${paddingProp[3]};
    `}
`;

export const Wrapper = styled.li`
  list-style: none;

  /* Padding Styles */
  ${paddingStyles}
  /* Color Styles */
  ${colorStyles}
`;
