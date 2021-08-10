import React from 'react';

import * as I from '.';
import * as S from '@atoms/Heading/style';

export const Heading: React.FC<I.HeadingProps> = ({ children, ...rest }) => {
  const { levelProp } = rest;
  const levelConfirm = (level: number) => {
    switch (level) {
      case 1:
        return <S.H1 {...rest}>{children}</S.H1>;
      case 2:
        return <S.H2 {...rest}>{children}</S.H2>;
      case 3:
        return <S.H3 {...rest}>{children}</S.H3>;
      case 4:
        return <S.H4 {...rest}>{children}</S.H4>;
      case 5:
        return <S.H5 {...rest}>{children}</S.H5>;
      case 6:
        return <S.H6 {...rest}>{children}</S.H6>;
      default:
        return <S.H6 {...rest}>{children}</S.H6>;
    }
  };

  if (levelProp) {
    return levelConfirm(levelProp);
  }
  return <S.H4 {...rest} />;
};

Heading.defaultProps = {
  marginProp: ['', ''],
  levelProp: 4,
};
