import styled, { css } from 'styled-components';

import * as I from '.';

type JustifyContentPick = Pick<I.ImgProps, 'justifyContentprop'>;
type AlignItemsPick = Pick<I.ImgProps, 'alignItemsprop'>;
type PaddingPick = Pick<I.ImgProps, 'paddingProp'>;
type BorderRadiusPick = Pick<I.ImgProps, 'borderRadiusProp'>;
type WidthPick = Pick<I.ImgProps, 'widthprop'>;
type HeightPick = Pick<I.ImgProps, 'heightprop'>;
type ColorPick = Pick<I.ImgProps, 'colorprop'>;

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

const alignItemsStyles = css<AlignItemsPick>`
  ${({ alignItemsprop }) => {
    switch (alignItemsprop) {
      case 'flex-start':
        return css`
          align-items: flex-start;
        `;
      case 'center':
        return css`
          align-items: center;
        `;
      case 'flex-end':
        return css`
          align-items: flex-end;
        `;
      default:
        break;
    }
  }}
`;

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

const widthStyles = css<WidthPick>`
  ${({ widthprop }) =>
    widthprop &&
    css`
      width: ${widthprop};
    `}
`;

const heightStyles = css<HeightPick>`
  ${({ heightprop }) =>
    heightprop &&
    css`
      height: ${heightprop};
    `}
`;

const colorStyles = css<ColorPick>`
  ${({ colorprop }) =>
    colorprop === 'white' &&
    css`
      border: 2px solid ${({ theme }) => theme.color.light};
      color: ${({ theme }) => theme.color.light};
      background-color: transparent;
    `}
`;

export const Wrapper = styled.img`
  /* Padding & Border Styles */
  ${paddingStyles}
  ${borderRadiusStyles}
`;

export const SubWrapper = styled.div`
  display: flex;

  /* Flex Styles */
  ${justifyContentStyles}
  ${alignItemsStyles}

  /* Padding & Border Styles */
  ${paddingStyles}
  ${borderRadiusStyles}

  /* Width & Height Styles */
  ${widthStyles}
  ${heightStyles}

  /* Color Styles */
  ${colorStyles}
`;
