import styled, { css } from 'styled-components';

import { HeadingProps } from '@atoms/Heading';

type LevelType = Pick<HeadingProps, 'level'>;

const commonStyles = css<LevelType>`
  margin: 0;
  margin-top: 0.85714em;
  margin-bottom: 0.57142em;
  font-weight: 500;
  font-size: ${({ level }) => level && `${0.75 + 4 * (1 / level)}rem`};
  color: ${({ theme }) => theme.color.light};
`;

export const H1 = styled.h1`
  ${commonStyles}
`;

export const H2 = styled.h2`
  ${commonStyles}
`;

export const H3 = styled.h3`
  ${commonStyles}
`;

export const H4 = styled.h4`
  ${commonStyles}
`;

export const H5 = styled.h5`
  ${commonStyles}
`;

export const H6 = styled.h6`
  ${commonStyles}
`;
