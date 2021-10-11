import styled, { css } from 'styled-components';

import * as I from '.';

type LevelPick = Pick<I.SpanProps, 'levelProp'>;
type PositionPick = Pick<I.SpanProps, 'positionprop'>;
type TopPick = Pick<I.SpanProps, 'topprop'>;
type DisplayPick = Pick<I.SpanProps, 'displayProp'>;
type AlignSelfPick = Pick<I.SpanProps, 'alignSelfProp'>;
type JustifyContentPick = Pick<I.SpanProps, 'justifyContentprop'>;
type MarginPick = Pick<I.SpanProps, 'marginProp'>;
type WidthPick = Pick<I.SpanProps, 'widthprop'>;
type ColorPick = Pick<I.SpanProps, 'colorProp'>;
type LineHeightPick = Pick<I.SpanProps, 'lineHeightprop'>;
type HighlightPick = Pick<I.SpanProps, 'highlightProp'>;
type OpacityPick = Pick<I.SpanProps, 'opacityprop'>;
type FontWeightPick = Pick<I.SpanProps, 'fontweightprop'>;

const levelStyles = css<LevelPick>`
  ${({ levelProp }) =>
    levelProp &&
    css`
      font-size: ${`${0.5 + 0.25 * (6 / levelProp)}rem`};
    `}
`;

const positionStyles = css<PositionPick>`
  ${({ positionprop }) =>
    positionprop &&
    css`
      position: ${positionprop};
    `}
`;

const topStyles = css<TopPick>`
  ${({ topprop }) =>
    topprop &&
    css`
      top: ${topprop};
    `}
`;

const displayStyles = css<DisplayPick>`
  ${({ displayProp }) => {
    switch (displayProp) {
      case 'inline':
        return css`
          display: inline;
        `;
      case 'inline-block':
        return css`
          display: inline-block;
        `;
      case 'inline-flex':
        return css`
          display: inline-flex !important;
        `;
      default:
        break;
    }
  }}
`;

const alignSelfStyles = css<AlignSelfPick>`
  ${({ alignSelfProp }) => {
    switch (alignSelfProp) {
      case 'flex-start':
        return css`
          align-self: flex-start;
        `;
      case 'center':
        return css`
          align-self: center;
        `;
      case 'flex-end':
        return css`
          align-self: flex-end;
        `;
      default:
        break;
    }
  }}
`;

const justifyContentStyles = css<JustifyContentPick>`
  ${({ justifyContentprop }) => {
    switch (justifyContentprop) {
      case 'flex-start':
        return css`
          justify-content: flex-start;
        `;
      case 'center':
        return css`
          justify-content: center;
        `;
      case 'flex-end':
        return css`
          justify-content: flex-end;
        `;
      default:
        break;
    }
  }}
`;

const marginStyles = css<MarginPick>`
  display: inline-block;

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

const widthStyles = css<WidthPick>`
  ${({ widthprop }) =>
    widthprop &&
    css`
      width: ${widthprop};
    `}
`;

const colorStyles = css<ColorPick>`
  ${({ colorProp }) =>
    colorProp === 'black' &&
    css`
      color: ${({ theme }) => theme.color.dark};
    `}
  ${({ colorProp }) =>
    colorProp === 'white' &&
    css`
      color: ${({ theme }) => theme.color.light};
    `}
  ${({ colorProp }) =>
    colorProp === 'red' &&
    css`
      color: ${({ theme }) => theme.color.red};
    `}
`;

const lineHeightStyles = css<LineHeightPick>`
  ${({ lineHeightprop }) =>
    lineHeightprop &&
    css`
      line-height: ${lineHeightprop};
    `}
`;

const highlightStyles = css<HighlightPick>`
  ${({ highlightProp }) =>
    highlightProp === true &&
    css`
      cursor: pointer;
      color: ${({ theme }) => theme.color.red};
      font-weight: 600;
      &:hover {
        opacity: 0.7;
      }
    `}
`;

const fontweightStyles = css<FontWeightPick>`
  ${({ fontweightprop }) =>
    fontweightprop &&
    css`
      font-weight: ${fontweightprop};
    `}
`;

const opacityStyles = css<OpacityPick>`
  ${({ opacityprop }) =>
    opacityprop &&
    css`
      opacity: ${opacityprop};
    `}
`;

export const Wrapper = styled.span`
  line-height: 1.5;

  /* Level Styles */
  ${levelStyles}

  /* Display Styles */
  ${positionStyles}
  ${topStyles}
  ${displayStyles}
  ${alignSelfStyles}
  ${justifyContentStyles}

  /* Margin Styles */
  ${marginStyles}

  /* Width Styles */
  ${widthStyles}

  /* Color Styles */
  ${colorStyles}

  /* Line Height Styles */
  ${lineHeightStyles}

  /* Highlight Styles */
  ${highlightStyles}

  /* Font Weight Styles */
  ${fontweightStyles}

  /* Opcaity Styles */
  ${opacityStyles}
`;
