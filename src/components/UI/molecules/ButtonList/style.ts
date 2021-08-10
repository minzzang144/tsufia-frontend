import styled, { css } from 'styled-components';

import * as I from '.';

type FlexDirectionPick = Pick<I.ButtonListProps, 'flexDirectionProp'>;
type GapPick = Pick<I.ButtonListProps, 'gapProp'>;

const flexDirectionStyles = css<FlexDirectionPick>`
  ${({ flexDirectionProp }) =>
    flexDirectionProp === I.FlexDirectionProp.Row &&
    css`
      flex-direction: row;
    `}
  ${({ flexDirectionProp }) =>
    flexDirectionProp === I.FlexDirectionProp.Column &&
    css`
      flex-direction: column;
    `}
`;

const gapStyles = css<GapPick>`
  ${({ gapProp }) =>
    gapProp &&
    gapProp.length === 1 &&
    css`
      gap: ${gapProp[0]};
    `}
  ${({ gapProp }) =>
    gapProp &&
    gapProp.length === 2 &&
    css`
      column-gap: ${gapProp[0]};
      row-gap: ${gapProp[1]};
    `}
`;

export const Wrapper = styled.div`
  display: flex;

  /* Flex Direction Styles */
  ${flexDirectionStyles}

  /* Gap Styles */
  ${gapStyles}
`;
