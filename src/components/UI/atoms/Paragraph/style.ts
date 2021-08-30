import styled, { css } from 'styled-components';

import * as I from '.';

type MarginPick = Pick<I.ParagraphProps, 'marginprop'>;
type FontSizePick = Pick<I.ParagraphProps, 'fontSizeProp'>;
type ColorPick = Pick<I.ParagraphProps, 'colorProp'>;

const marginStyles = css<MarginPick>`
  ${({ marginprop }) => {
    switch (marginprop?.length) {
      case 1:
        return css`
          margin: 0;
          margin: ${marginprop[0]} !important;
        `;
      case 2:
        return css`
          margin: 0;
          margin: ${marginprop[0]} ${marginprop[1]} !important;
        `;
      case 3:
        return css`
          margin: 0;
          margin: ${marginprop[0]} ${marginprop[1]} ${marginprop[2]} !important;
        `;
      case 4:
        return css`
          margin: 0;
          margin: ${marginprop[0]} ${marginprop[1]} ${marginprop[2]} ${marginprop[3]} !important;
        `;
      default:
        break;
    }
  }}
`;

const fontSizeStyles = css<FontSizePick>`
  ${({ fontSizeProp }) =>
    fontSizeProp === I.FontSizeProp.Small &&
    css`
      font-size: small;
    `}
  ${({ fontSizeProp }) =>
    fontSizeProp === I.FontSizeProp.Medium &&
    css`
      font-size: medium;
    `}
  ${({ fontSizeProp }) =>
    fontSizeProp === I.FontSizeProp.Large &&
    css`
      font-size: large;
    `}
`;

const colorStyles = css<ColorPick>`
  ${({ colorProp }) =>
    colorProp === I.ColorProp.Black &&
    css`
      color: ${({ theme }) => theme.color.dark};
    `}
  ${({ colorProp }) =>
    colorProp === I.ColorProp.White &&
    css`
      color: ${({ theme }) => theme.color.light};
    `}
  ${({ colorProp }) =>
    colorProp === I.ColorProp.Red &&
    css`
      color: ${({ theme }) => theme.color.red};
    `}
`;

export const Wrapper = styled.p`
  line-height: 1.5;
  word-break: break-all;
  white-space: normal;

  /* Margin Styles */
  ${marginStyles}

  /* Font Size Styles */
  ${fontSizeStyles}

  /* Color Size Styles */
  ${colorStyles}
`;
