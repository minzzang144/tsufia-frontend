import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import * as I from '.';

type DisplayPick = Pick<I.LinkProps, 'displayprop'>;
type PaddingPick = Pick<I.LinkProps, 'paddingprop'>;
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

const paddingStyles = css<PaddingPick>`
  ${({ paddingprop }) =>
    paddingprop &&
    paddingprop.length === 1 &&
    css`
      padding: 0;
      padding: ${paddingprop[0]};
    `}
  ${({ paddingprop }) =>
    paddingprop &&
    paddingprop.length === 2 &&
    css`
      padding: 0;
      padding: ${paddingprop[0]} ${paddingprop[1]};
    `}
  ${({ paddingprop }) =>
    paddingprop &&
    paddingprop.length === 3 &&
    css`
      padding: 0;
      padding: ${paddingprop[0]} ${paddingprop[1]} ${paddingprop[2]};
    `}
  ${({ paddingprop }) =>
    paddingprop &&
    paddingprop.length === 4 &&
    css`
      padding: 0;
      padding: ${paddingprop[0]} ${paddingprop[1]} ${paddingprop[2]} ${paddingprop[3]};
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
  ${paddingStyles}
  ${widthStyles}

  /* Color Styles */
  ${colorStyles}
  ${hoverStyles}
`;
