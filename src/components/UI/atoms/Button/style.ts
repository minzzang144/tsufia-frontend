import styled, { css } from 'styled-components';

import * as I from '.';

type IsValidPick = Pick<I.ButtonProps, 'isValid'>;
type ColorPick = Pick<I.ButtonProps, 'colorProp'>;
type MarginPick = Pick<I.ButtonProps, 'marginProp'>;
type PaddingPick = Pick<I.ButtonProps, 'paddingProp'>;
type BorderRadiusPick = Pick<I.ButtonProps, 'borderRadiusProp'>;
type WidthPick = Pick<I.ButtonProps, 'widthProp'>;
type HeightPick = Pick<I.ButtonProps, 'heightProp'>;
type HoverPick = Pick<I.ButtonProps, 'hoverProp'>;

const isValidStyles = css<IsValidPick & ColorPick>`
  ${({ isValid, colorProp }) => {
    if (isValid === true && colorProp === 'black') {
      return css`
        border: 2px solid ${({ theme }) => theme.color.dark} !important;
        color: ${({ theme }) => theme.color.dark} !important;
        background-color: ${({ theme }) => theme.color.light} !important;
      `;
    }
    if (isValid === true && colorProp === 'white') {
      return css`
        border: 2px solid ${({ theme }) => theme.color.light} !important;
        color: ${({ theme }) => theme.color.light} !important;
        background-color: transparent !important;
      `;
    }
  }}
`;

const colorStyles = css<ColorPick>`
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
  ${({ colorProp }) =>
    colorProp === 'yellow' &&
    css`
      border: none;
      background-color: ${({ theme }) => theme.color.yellow};
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

const borderRadiusStyles = css<BorderRadiusPick>`
  ${({ borderRadiusProp }) =>
    borderRadiusProp &&
    css`
      border-radius: ${borderRadiusProp};
    `}
`;
const widthStyles = css<WidthPick>`
  ${({ widthProp }) =>
    widthProp &&
    css`
      width: ${widthProp};
    `}
`;
const heightStyles = css<HeightPick>`
  ${({ heightProp }) =>
    heightProp &&
    css`
      height: ${heightProp};
    `}
`;

const hoverStyles = css<HoverPick>`
  ${({ hoverProp }) =>
    hoverProp === true &&
    css`
      &:hover {
        opacity: 0.7;
      }
    `}
`;

export const Wrapper = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;

  /* IsValid Styles */
  ${isValidStyles}

  /* Size Styles */
  ${colorStyles}

  /* Margin & Padding & Border Styles */
  ${marginStyles}
  ${paddingStyles}
  ${borderRadiusStyles}

  /* Width & Height Styles */
  ${widthStyles}
  ${heightStyles}
  
  /* Hover Styles */
  ${hoverStyles}
`;
