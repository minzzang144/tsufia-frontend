import styled, { css } from 'styled-components';

import * as I from '.';

type WidthPick = Pick<I.TableProps, 'widthprop'>;
type MaxWidthPick = Pick<I.TableProps, 'maxWidthprop'>;
type ColorPick = Pick<I.TableProps, 'colorprop'>;

const widthStyles = css<WidthPick>`
  ${({ widthprop }) =>
    widthprop &&
    css`
      width: ${widthprop};
    `}
`;

const maxWidthStyles = css<MaxWidthPick>`
  ${({ maxWidthprop }) =>
    maxWidthprop &&
    css`
      width: ${maxWidthprop};
    `}
`;

const colorStyles = css<ColorPick>`
  ${({ colorprop }) => {
    switch (colorprop) {
      case 'white':
        return css`
          color: ${(prop) => prop.theme.color.light};
        `;
      case 'black':
        return css`
          color: ${(prop) => prop.theme.color.dark};
        `;
      case 'red':
        return css`
          color: ${(prop) => prop.theme.color.red};
        `;
      default:
        break;
    }
  }}
`;

export const Wrapper = styled.table`
  ${widthStyles}
  ${maxWidthStyles}
  ${colorStyles}
`;
