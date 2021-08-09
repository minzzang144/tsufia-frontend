import styled, { css } from 'styled-components';

import { ColorProp, FontSizeProp, ParagraphProps } from '@atoms/Paragraph';

type FontSizePick = Pick<ParagraphProps, 'fontSizeProp'>;

type ColorPick = Pick<ParagraphProps, 'colorProp'>;

const fontSizeStyles = css<FontSizePick>`
  ${({ fontSizeProp }) =>
    fontSizeProp === FontSizeProp.Small &&
    css`
      font-size: small;
    `}
  ${({ fontSizeProp }) =>
    fontSizeProp === FontSizeProp.Medium &&
    css`
      font-size: medium;
    `}
  ${({ fontSizeProp }) =>
    fontSizeProp === FontSizeProp.Large &&
    css`
      font-size: large;
    `}
`;

const colorStyles = css<ColorPick>`
  ${({ colorProp }) =>
    colorProp === ColorProp.Black &&
    css`
      color: ${({ theme }) => theme.color.dark};
    `}
  ${({ colorProp }) =>
    colorProp === ColorProp.White &&
    css`
      color: ${({ theme }) => theme.color.light};
    `}
  ${({ colorProp }) =>
    colorProp === ColorProp.Red &&
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
