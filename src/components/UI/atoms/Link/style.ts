import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import * as I from '.';

type DisplayPick = Pick<I.LinkProps, 'displayprop'>;
type WidthPick = Pick<I.LinkProps, 'widthprop'>;
type ColorPick = Pick<I.LinkProps, 'colorprop'>;
type HoverOpacityPick = Pick<I.LinkProps, 'hoveropacityprop'>;

const displayStyles = css<DisplayPick>`
  ${({ displayprop }) =>
    displayprop === 'inline-block' &&
    css`
      display: inline-block;
    `}
`;

const widthStyles = css<WidthPick>`
  width: ${({ widthprop }) => widthprop};
`;

const colorStyles = css<ColorPick>`
  ${({ colorprop }) =>
    colorprop === 'black' &&
    css`
      color: ${({ theme }) => theme.color.dark};
    `}
  ${({ colorprop }) =>
    colorprop === 'white' &&
    css`
      color: ${({ theme }) => theme.color.light};
    `}
`;

const hoverStyles = css<HoverOpacityPick>`
  &:hover {
    opacity: ${({ hoveropacityprop }) => hoveropacityprop};
  }
`;

export const Wrapper = styled(Link)`
  text-decoration: none;

  /* Display Styles */
  ${displayStyles}

  /* Width Styles */
  ${widthStyles}

  /* Color Styles */
  ${colorStyles}
  ${hoverStyles}
`;
