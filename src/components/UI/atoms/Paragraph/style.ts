import styled, { css } from 'styled-components';

import * as I from '.';

type MarginPick = Pick<I.ParagraphProps, 'marginprop'>;
type FontSizePick = Pick<I.ParagraphProps, 'fontSizeProp'>;
type ColorPick = Pick<I.ParagraphProps, 'colorProp'>;
type WorkBreakPick = Pick<I.ParagraphProps, 'wordbreakprop'>;
type WhiteSpacePick = Pick<I.ParagraphProps, 'whitespaceprop'>;
type TextAlignPick = Pick<I.ParagraphProps, 'textalignprop'>;

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

const wordBreakStyles = css<WorkBreakPick>`
  ${({ wordbreakprop }) => {
    switch (wordbreakprop) {
      case 'normal':
        return css`
          word-break: normal;
        `;
      case 'break-all':
        return css`
          word-break: break-all;
        `;
      case 'break-word':
        return css`
          word-break: break-word;
        `;
      case 'keep-all':
        return css`
          word-break: keep-all;
        `;
      default:
        break;
    }
  }}
`;

const whiteSpaceStyles = css<WhiteSpacePick>`
  ${({ whitespaceprop }) => {
    switch (whitespaceprop) {
      case 'normal':
        return css`
          white-space: normal;
        `;
      case 'nowrap':
        return css`
          white-space: nowrap;
        `;
      case 'pre':
        return css`
          white-space: pre;
        `;
      case 'pre-line':
        return css`
          white-space: pre-line;
        `;
      case 'pre-wrap':
        return css`
          white-space: pre-wrap;
        `;
      default:
        break;
    }
  }}
`;

const textAlignStyles = css<TextAlignPick>`
  ${({ textalignprop }) => {
    switch (textalignprop) {
      case 'start':
        return css`
          text-align: start;
        `;
      case 'center':
        return css`
          text-align: center;
        `;
      case 'end':
        return css`
          text-align: end;
        `;
      default:
        break;
    }
  }}
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

  /* Word Styles */
  ${wordBreakStyles}
  ${whiteSpaceStyles}
  ${textAlignStyles}
`;
