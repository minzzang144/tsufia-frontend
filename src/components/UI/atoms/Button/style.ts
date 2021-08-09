import styled, { css } from 'styled-components';

import { ButtonProps, ColorProp } from '@atoms/Button';

type ColorType = Pick<ButtonProps, 'color'>;

const sizeStyles = css<ColorType>`
  ${({ color }) =>
    color === ColorProp.Black &&
    css`
      border: 2px solid ${({ theme }) => theme.color.light};
      color: ${({ theme }) => theme.color.light};
      background-color: transparent;
    `}
  ${({ color }) =>
    color === ColorProp.White &&
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
