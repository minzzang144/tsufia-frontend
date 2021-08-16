import styled, { css } from 'styled-components';

import * as I from '.';

type MarginPick = Pick<I.SpanProps, 'marginProp'>;
type ColorPick = Pick<I.SpanProps, 'colorProp'>;
type HighlightPick = Pick<I.SpanProps, 'highlightProp'>;

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
  font-size: 1rem;
  line-height: 2em;

  /* Margin Styles */
  ${marginStyles}

  /* Color Styles */
  ${colorStyles}

  /* Highlight Styles */
  ${highlightStyles}
`;
