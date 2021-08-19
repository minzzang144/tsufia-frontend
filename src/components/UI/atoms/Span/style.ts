import styled, { css } from 'styled-components';

import * as I from '.';

type LevelPick = Pick<I.SpanProps, 'levelProp'>;
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

  /* Margin Styles */
  ${marginStyles}

  /* Color Styles */
  ${colorStyles}

  /* Highlight Styles */
  ${highlightStyles}
`;
