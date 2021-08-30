import styled, { css } from 'styled-components';

import * as I from '.';

type DisplayPick = Pick<I.ListProps, 'displayprop'>;
type FlexDirectionPick = Pick<I.ListProps, 'flexDirectionprop'>;
type JustifyContentPick = Pick<I.ListProps, 'justifyContentprop'>;
type AlignItemsPick = Pick<I.ListProps, 'alignItemsprop'>;
type AlignSelfPick = Pick<I.ListProps, 'alignSelfprop'>;
type PaddingPick = Pick<I.ListProps, 'paddingProp'>;
type BorderPick = Pick<I.ListProps, 'borderprop'>;
type BorderRadiusPick = Pick<I.ListProps, 'borderRadiusprop'>;
type ColorPick = Pick<I.ListProps, 'colorProp'>;

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
  ${({ colorProp }) =>
    colorProp === 'white' &&
    css`
      color: ${({ theme }) => theme.color.dark};
    `}
  ${({ colorProp }) =>
    colorProp === 'black' &&
    css`
      color: ${({ theme }) => theme.color.light};
    `}
`;

export const Wrapper = styled.li`
  list-style: none;

  /* Flex Styles */
  ${displayStyles}
  ${flexDirectionStyles}
  ${justifyContentStyles}
  ${alignItemsStyles}
  ${alignSelfStyles}

  /* Padding Border Styles */
  ${paddingStyles}
  ${borderStyles}
  ${borderRadiusStyles}
  
  /* Color Styles */
  ${colorStyles}
`;
