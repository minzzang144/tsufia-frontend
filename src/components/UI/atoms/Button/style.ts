import styled, { css } from 'styled-components';

import * as I from '.';

type ColorPick = Pick<I.ButtonProps, 'colorProp'>;

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

export const Wrapper = styled.button`
  display: inline-flex;
  padding: 1rem 2rem;
  outline: none;
  cursor: pointer;

  /* Size Styles */
  ${sizeStyles}
`;
