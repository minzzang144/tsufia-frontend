import styled, { css } from 'styled-components';

import * as I from '.';

type FlexDirectionPick = Pick<I.ButtonListProps, 'flexDirection'>;

type GapPick = Pick<I.ButtonListProps, 'gap'>;

const flexDirectionStyles = css<FlexDirectionPick>`
  ${({ flexDirection }) =>
    flexDirection === I.FlexDirectionProp.Row &&
    css`
      flex-direction: row;
    `}
  ${({ flexDirection }) =>
    flexDirection === I.FlexDirectionProp.Column &&
    css`
      flex-direction: column;
    `}
`;

const gapStyles = css<GapPick>`
  ${({ gap }) =>
    gap &&
    gap.length === 1 &&
    css`
      gap: ${gap[0]};
    `}
  ${({ gap }) =>
    gap &&
    gap.length === 2 &&
    css`
      column-gap: ${gap[0]};
      row-gap: ${gap[1]};
    `}
`;

export const Wrapper = styled.div`
  display: flex;

  /* Flex Direction Styles */
  ${flexDirectionStyles}

  /* Gap Styles */
  ${gapStyles}
`;
