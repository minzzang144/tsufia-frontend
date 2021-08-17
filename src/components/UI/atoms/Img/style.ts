import styled, { css } from 'styled-components';

import * as I from '.';

type PaddingPick = Pick<I.ImgProps, 'paddingProp'>;
type BorderRadiusPick = Pick<I.ImgProps, 'borderRadiusProp'>;

const paddingStyles = css<PaddingPick>`
  ${({ paddingProp }) =>
    paddingProp &&
    paddingProp.length === 1 &&
    css`
      padding: 0;
      padding: ${paddingProp[0]};
    `}
  ${({ paddingProp }) =>
    paddingProp &&
    paddingProp.length === 2 &&
    css`
      padding: 0;
      padding: ${paddingProp[0]} ${paddingProp[1]};
    `}
  ${({ paddingProp }) =>
    paddingProp &&
    paddingProp.length === 3 &&
    css`
      padding: 0;
      padding: ${paddingProp[0]} ${paddingProp[1]} ${paddingProp[2]};
    `}
  ${({ paddingProp }) =>
    paddingProp &&
    paddingProp.length === 4 &&
    css`
      padding: 0;
      padding: ${paddingProp[0]} ${paddingProp[1]} ${paddingProp[2]} ${paddingProp[3]};
    `}
`;

const borderRadiusStyles = css<BorderRadiusPick>`
  ${({ borderRadiusProp }) =>
    borderRadiusProp &&
    css`
      border-radius: ${borderRadiusProp};
    `}
`;

export const Wrapper = styled.img`
  /* Padding & Border Styles */
  ${paddingStyles}
  ${borderRadiusStyles}
`;
