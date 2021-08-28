import styled, { css } from 'styled-components';

import * as I from '.';

type FlexDirectionPick = Pick<I.UnorderedListProps, 'flexDirection'>;
type JustifyContentPick = Pick<I.UnorderedListProps, 'justifyContentProp'>;
type AlignItemsPick = Pick<I.UnorderedListProps, 'alignItemsProp'>;
type WidthPick = Pick<I.UnorderedListProps, 'widthProp'>;

const flexDirectionStyles = css<FlexDirectionPick>`
  ${({ flexDirection }) =>
    flexDirection === 'row' &&
    css`
      flex-direction: row;
    `}
  ${({ flexDirection }) =>
    flexDirection === 'column' &&
    css`
      flex-direction: column;
    `}
`;

const justifyContentStyles = css<JustifyContentPick>`
  ${({ justifyContentProp }) => {
    switch (justifyContentProp) {
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
      case 'space-around':
        return css`
          justify-content: space-around;
        `;
      case 'space-evenly':
        return css`
          justify-content: space-evenly;
        `;
      default:
        break;
    }
  }}
`;

const alignItemsStyles = css<AlignItemsPick>`
  ${({ alignItemsProp }) => {
    switch (alignItemsProp) {
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

const widthStyles = css<WidthPick>`
  ${({ widthProp }) =>
    widthProp &&
    css`
      width: ${widthProp};
    `}
`;

export const Wrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  /* Flex Direction Styles */
  ${flexDirectionStyles}
  ${justifyContentStyles}
  ${alignItemsStyles}

  /* Width Styles */
  ${widthStyles}
`;
