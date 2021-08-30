import styled, { css } from 'styled-components';

import * as I from '.';

type DisplayPick = Pick<I.ListProps, 'displayprop'>;
type FlexDirectionPick = Pick<I.ListProps, 'flexDirectionprop'>;
type JustifyContentPick = Pick<I.ListProps, 'justifyContentprop'>;
type AlignItemsPick = Pick<I.ListProps, 'alignItemsprop'>;
type ColorPick = Pick<I.ListProps, 'colorProp'>;
type PaddingPick = Pick<I.ListProps, 'paddingProp'>;

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

export const Wrapper = styled.li`
  list-style: none;

  /* Flex Styles */
  ${displayStyles}
  ${flexDirectionStyles}
  ${justifyContentStyles}
  ${alignItemsStyles}
  /* Padding Styles */
  ${paddingStyles}
  /* Color Styles */
  ${colorStyles}
`;
