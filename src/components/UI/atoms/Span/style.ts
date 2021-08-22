import styled, { css } from 'styled-components';

import * as I from '.';

type LevelPick = Pick<I.SpanProps, 'levelProp'>;
type DisplayPick = Pick<I.SpanProps, 'displayProp'>;
type AlignSelfPick = Pick<I.SpanProps, 'alignSelfProp'>;
type MarginPick = Pick<I.SpanProps, 'marginProp'>;
type ColorPick = Pick<I.SpanProps, 'colorProp'>;
type HighlightPick = Pick<I.SpanProps, 'highlightProp'>;

const levelStyles = css<LevelPick>`
  ${({ levelProp }) =>
    levelProp &&
    css`
      font-size: ${`${0.75 + 0.25 * (6 / levelProp)}rem`};
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

export const Wrapper = styled.span`
  line-height: 2em;

  /* Level Styles */
  ${levelStyles}

  /* Display Styles */
  ${displayStyles}
  ${alignSelfStyles}

  /* Margin Styles */
  ${marginStyles}

  /* Color Styles */
  ${colorStyles}

  /* Highlight Styles */
  ${highlightStyles}
`;
