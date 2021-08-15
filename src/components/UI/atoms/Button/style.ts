import styled, { css } from 'styled-components';

import * as I from '.';

type IsValidPick = Pick<I.ButtonProps, 'isValid'>;
type ColorPick = Pick<I.ButtonProps, 'colorProp'>;
type MarginPick = Pick<I.ButtonProps, 'marginProp'>;
type PaddingPick = Pick<I.ButtonProps, 'paddingProp'>;

const isValidStyles = css<IsValidPick>`
  ${({ isValid }) =>
    isValid === false &&
    css`
      opacity: 0.8;
    `}
`;

const sizeStyles = css<ColorPick>`
  ${({ colorProp }) =>
    colorProp === 'black' &&
    css`
      border: 2px solid ${({ theme }) => theme.color.light};
      color: ${({ theme }) => theme.color.light};
      background-color: transparent;
    `}
  ${({ colorProp }) =>
    colorProp === 'white' &&
    css`
      border: 2px solid ${({ theme }) => theme.color.dark};
      color: ${({ theme }) => theme.color.dark};
      background-color: ${({ theme }) => theme.color.light};
    `}
`;

const marginStyles = css<MarginPick>`
  ${({ marginProp }) =>
    marginProp &&
    marginProp.length === 1 &&
    css`
      margin: 0;
      margin: ${marginProp[0]};
    `}
  ${({ marginProp }) =>
    marginProp &&
    marginProp.length === 2 &&
    css`
      margin: 0;
      margin: ${marginProp[0]} ${marginProp[1]};
    `}
  ${({ marginProp }) =>
    marginProp &&
    marginProp.length === 3 &&
    css`
      margin: 0;
      margin: ${marginProp[0]} ${marginProp[1]} ${marginProp[2]};
    `}
  ${({ marginProp }) =>
    marginProp &&
    marginProp.length === 4 &&
    css`
      margin: 0;
      margin: ${marginProp[0]} ${marginProp[1]} ${marginProp[2]} ${marginProp[3]};
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

  /* IsValid Styles */
  ${isValidStyles}

  /* Size Styles */
  ${sizeStyles}

  /* Margin & Padding Styles */
  ${marginStyles}
  ${paddingStyles}
`;
