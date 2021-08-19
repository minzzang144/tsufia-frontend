import styled, { css } from 'styled-components';

import * as I from '.';

type FlexDirectionPick = Pick<I.UnorderedListProps, 'flexDirection'>;

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
  flex-wrap: wrap;
  /* Flex Direction Styles */
  ${flexDirectionStyles}
`;
