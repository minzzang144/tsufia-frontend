import styled, { css } from 'styled-components';

import * as I from '.';

type ColorPick = Pick<I.ButtonProps, 'colorProp'>;
type PaddingPick = Pick<I.ButtonProps, 'paddingProp'>;

const sizeStyles = css<ColorPick>`
  ${({ colorProp }) =>
    colorProp === I.ColorProp.Black &&
    css`
      border: 2px solid ${({ theme }) => theme.color.light};
      color: ${({ theme }) => theme.color.light};
      background-color: transparent;
    `}
  ${({ colorProp }) =>
    colorProp === I.ColorProp.White &&
    css`
      border: 2px solid ${({ theme }) => theme.color.dark};
      color: ${({ theme }) => theme.color.dark};
      background-color: ${({ theme }) => theme.color.light};
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

export const Wrapper = styled.button`
  display: inline-flex;
  outline: none;
  cursor: pointer;

  /* Size Styles */
  ${sizeStyles}

  /* Padding Styles */
  ${paddingStyles}
`;
