import styled, { css } from 'styled-components';

import * as I from '.';

type PaddingPick = Pick<I.TdataProps, 'paddingprop'>;
type ColorPick = Pick<I.TdataProps, 'colorprop'>;

const paddingStyles = css<PaddingPick>`
  ${({ paddingprop }) => {
    switch (paddingprop?.length) {
      case 1:
        return css`
          padding: 0;
          padding: ${paddingprop[0]} !important;
        `;
      case 2:
        return css`
          padding: 0;
          padding: ${paddingprop[0]} ${paddingprop[1]} !important;
        `;
      case 3:
        return css`
          padding: 0;
          padding: ${paddingprop[0]} ${paddingprop[1]} ${paddingprop[2]} !important;
        `;
      case 4:
        return css`
          padding: 0;
          padding: ${paddingprop[0]} ${paddingprop[1]} ${paddingprop[2]} ${paddingprop[3]} !important;
        `;
      default:
        break;
    }
  }}
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

export const Wrapper = styled.td`
  text-align: center;
  ${paddingStyles}
  ${colorStyles}
`;
