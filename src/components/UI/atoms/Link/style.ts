import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import * as I from '.';

type ColorPick = Pick<I.LinkProps, 'colorProp'>;

const colorStyles = css<ColorPick>`
  ${({ colorProp }) =>
    colorProp === 'black' &&
    css`
      color: ${({ theme }) => theme.color.dark};
      &:hover {
        opacity: 0.7;
      }
    `}
  ${({ colorProp }) =>
    colorProp === 'white' &&
    css`
      color: ${({ theme }) => theme.color.light};
      &:hover {
        opacity: 0.7;
      }
    `}
`;

export const Wrapper = styled(Link)`
  text-decoration: none;

  /* Color Styles */
  ${colorStyles}
`;
