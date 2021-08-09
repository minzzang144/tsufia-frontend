import styled, { css } from 'styled-components';

import * as I from '.';

type FlexDirectionPick = Pick<I.ButtonListProps, 'flexDirection'>;

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

export const Wrapper = styled.div`
  display: flex;

  /* Flex Direction Styles */
  ${flexDirectionStyles}
`;
