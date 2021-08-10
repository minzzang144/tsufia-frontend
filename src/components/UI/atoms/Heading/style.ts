import styled, { css } from 'styled-components';

import { HeadingProps } from '@atoms/Heading';

type LevelPick = Pick<HeadingProps, 'levelProp'>;
type MarginPick = Pick<HeadingProps, 'marginProp'>;

const commonStyles = css<HeadingProps>`
  font-weight: 500;
  color: ${({ theme }) => theme.color.light};
`;

const levelStyles = css<LevelPick>`
  ${({ levelProp }) =>
    levelProp &&
    css`
      font-size: ${`${0.75 + 4 * (1 / levelProp)}rem`};
    `}
`;

const marginStyles = css<MarginPick>`
  ${({ marginProp }) =>
    marginProp &&
    marginProp.length === 1 &&
    css`
      margin: 0;
      margin: ${marginProp[0]};
    `}
  ${({ marginProp }) =>
    marginProp &&
    marginProp.length === 2 &&
    css`
      margin: 0;
      margin: ${marginProp[0]} ${marginProp[1]};
    `}
  ${({ marginProp }) =>
    marginProp &&
    marginProp.length === 3 &&
    css`
      margin: 0;
      margin: ${marginProp[0]} ${marginProp[1]} ${marginProp[2]};
    `}
  ${({ marginProp }) =>
    marginProp &&
    marginProp.length === 4 &&
    css`
      margin: 0;
      margin: ${marginProp[0]} ${marginProp[1]} ${marginProp[2]} ${marginProp[3]};
    `}
`;

export const H1 = styled.h1`
  ${commonStyles}
  ${levelStyles}
  ${marginStyles}
`;

export const H2 = styled.h2`
  ${commonStyles}
  ${levelStyles}
  ${marginStyles}
`;

export const H3 = styled.h3`
  ${commonStyles}
  ${levelStyles}
  ${marginStyles}
`;

export const H4 = styled.h4`
  ${commonStyles}
  ${levelStyles}
  ${marginStyles}
`;

export const H5 = styled.h5`
  ${commonStyles}
  ${levelStyles}
  ${marginStyles}
`;

export const H6 = styled.h6`
  ${commonStyles}
  ${levelStyles}
  ${marginStyles}
`;
