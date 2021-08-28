import styled, { css } from 'styled-components';

import * as I from '.';

type FlexDirectionPick = Pick<I.FormProps, 'flexDirectionProp'>;
type justifyContentPick = Pick<I.FormProps, 'justifyContentProp'>;
type alignItemsPick = Pick<I.FormProps, 'alignItemsProp'>;
type WidthPick = Pick<I.FormProps, 'widthProp'>;

const flexDirectionStyles = css<FlexDirectionPick>`
  ${({ flexDirectionProp }) => {
    switch (flexDirectionProp) {
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

const justifyContentStyles = css<justifyContentPick>`
  ${({ justifyContentProp }) => {
    switch (justifyContentProp) {
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

const alignItemsStyles = css<alignItemsPick>`
  ${({ alignItemsProp }) => {
    switch (alignItemsProp) {
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
  ${({ widthProp }) =>
    widthProp &&
    css`
      width: ${widthProp};
    `}
`;

export const Wrapper = styled.form`
  display: flex;
  align-items: center;

  /* Flex Styles */
  ${flexDirectionStyles}
  ${justifyContentStyles}
  ${alignItemsStyles}

  /* Width Styles */
  ${widthStyles}
`;
