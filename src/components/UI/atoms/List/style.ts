import styled, { css } from 'styled-components';

import * as I from '.';

type PositionPick = Pick<I.ListProps, 'positionprop'>;
type DisplayPick = Pick<I.ListProps, 'displayprop'>;
type FlexDirectionPick = Pick<I.ListProps, 'flexDirectionprop'>;
type JustifyContentPick = Pick<I.ListProps, 'justifyContentprop'>;
type AlignItemsPick = Pick<I.ListProps, 'alignItemsprop'>;
type AlignSelfPick = Pick<I.ListProps, 'alignSelfprop'>;
type WidthPick = Pick<I.ListProps, 'widthprop'>;
type MaxWidthPick = Pick<I.ListProps, 'maxWidthprop'>;
type MarginPick = Pick<I.ListProps, 'marginprop'>;
type PaddingPick = Pick<I.ListProps, 'paddingProp'>;
type BorderPick = Pick<I.ListProps, 'borderprop'>;
type BorderRadiusPick = Pick<I.ListProps, 'borderRadiusprop'>;
type TextAlignPick = Pick<I.ListProps, 'textalignprop'>;
type ColorPick = Pick<I.ListProps, 'colorprop'>;
type CursorPick = Pick<I.ListProps, 'cursorprop'>;
type ShadowPick = Pick<I.ListProps, 'shadowprop'>;
type HoverShadowPick = Pick<I.ListProps, 'hovershadowprop'>;

const positionStyles = css<PositionPick>`
  ${({ positionprop }) => {
    switch (positionprop) {
      case 'relative':
        return css`
          position: relative;
        `;
      case 'absolute':
        return css`
          position: absolute;
        `;
      default:
        break;
    }
  }}
`;

const displayStyles = css<DisplayPick>`
  ${({ displayprop }) => {
    switch (displayprop) {
      case 'flex':
        return css`
          display: flex;
        `;
      default:
        break;
    }
  }}
`;

const flexDirectionStyles = css<FlexDirectionPick>`
  ${({ flexDirectionprop }) => {
    switch (flexDirectionprop) {
      case 'row':
        return css`
          flex-direction: row;
        `;
      case 'column':
        return css`
          flex-direction: column;
        `;
      default:
        break;
    }
  }}
`;

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

const alignSelfStyles = css<AlignSelfPick>`
  ${({ alignSelfprop }) => {
    switch (alignSelfprop) {
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
      max-width: ${maxWidthprop};
    `}
`;

const marginStyles = css<MarginPick>`
  ${({ marginprop }) => {
    switch (marginprop?.length) {
      case 1:
        return css`
          margin: 0;
          margin: ${marginprop[0]} !important;
        `;
      case 2:
        return css`
          margin: 0;
          margin: ${marginprop[0]} ${marginprop[1]} !important;
        `;
      case 3:
        return css`
          margin: 0;
          margin: ${marginprop[0]} ${marginprop[1]} ${marginprop[2]} !important;
        `;
      case 4:
        return css`
          margin: 0;
          margin: ${marginprop[0]} ${marginprop[1]} ${marginprop[2]} ${marginprop[3]} !important;
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

const borderStyles = css<BorderPick>`
  ${({ borderprop }) =>
    borderprop &&
    css`
      border: ${borderprop['line-style']} ${borderprop['line-width']} ${borderprop.color};
    `}
`;

const borderRadiusStyles = css<BorderRadiusPick>`
  ${({ borderRadiusprop }) =>
    borderRadiusprop &&
    css`
      border-radius: ${borderRadiusprop};
    `}
`;

const colorStyles = css<ColorPick>`
  ${({ colorprop }) =>
    colorprop === 'white' &&
    css`
      color: ${({ theme }) => theme.color.dark};
    `}
  ${({ colorprop }) =>
    colorprop === 'black' &&
    css`
      color: ${({ theme }) => theme.color.light};
    `}
`;

const textAlignStyles = css<TextAlignPick>`
  ${({ textalignprop }) => {
    switch (textalignprop) {
      case 'start':
        return css`
          text-align: start;
        `;
      case 'center':
        return css`
          text-align: center;
        `;
      case 'end':
        return css`
          text-align: end;
        `;
      default:
        break;
    }
  }}
`;

const cursorStyles = css<CursorPick>`
  ${({ cursorprop }) => {
    switch (cursorprop) {
      case true:
        return css`
          cursor: pointer;
        `;
      default:
        break;
    }
  }}
`;

const shadowStyles = css<ShadowPick>`
  ${({ shadowprop }) => {
    switch (shadowprop) {
      case true:
        return css`
          box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        `;
      default:
        break;
    }
  }}
`;

const hoverShadowStyles = css<HoverShadowPick>`
  ${({ hovershadowprop }) => {
    switch (hovershadowprop) {
      case true:
        return css`
          &:hover {
            box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000,
              0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
        `;
      default:
        break;
    }
  }}
`;

export const Wrapper = styled.li`
  list-style: none;

  /* Position Styles */
  ${positionStyles}

  /* Flex Styles */
  ${displayStyles}
  ${flexDirectionStyles}
  ${justifyContentStyles}
  ${alignItemsStyles}
  ${alignSelfStyles}
  ${textAlignStyles}

  /* Width Styles */
  ${widthStyles}
  ${maxWidthStyles}

  /* Margin Padding Border Styles */
  ${marginStyles}
  ${paddingStyles}
  ${borderStyles}
  ${borderRadiusStyles}
  
  /* Color Styles */
  ${colorStyles}

  /* Cursor Styles */
  ${cursorStyles}

  /* Box Shadow Styles */
  ${shadowStyles}
  ${hoverShadowStyles}
`;
