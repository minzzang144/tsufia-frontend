import styled, { css } from 'styled-components';

import { ButtonListProps, FlexDirectionProp } from '@molecules/ButtonList';

type FlexDirection = Pick<ButtonListProps, 'flexDirection'>;

const flexDirectionStyles = css<FlexDirection>`
  ${({ flexDirection }) =>
    flexDirection === FlexDirectionProp.Row &&
    css`
      flex-direction: row;
    `}
  ${({ flexDirection }) =>
    flexDirection === FlexDirectionProp.Column &&
    css`
      flex-direction: column;
    `}
`;

export const Wrapper = styled.div`
  display: flex;

  /* Flex Direction Styles */
  ${flexDirectionStyles}
`;
