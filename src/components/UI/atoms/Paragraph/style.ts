import styled, { css } from 'styled-components';

import * as I from '.';

type FontSizePick = Pick<I.ParagraphProps, 'fontSizeProp'>;

type ColorPick = Pick<I.ParagraphProps, 'colorProp'>;

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
  margin: 1rem 0;
  line-height: 1.5;

  /* Font Size Styles */
  ${fontSizeStyles}

  /* Color Size Styles */
  ${colorStyles}
`;
