import React from 'react';

import * as I from '.';
import * as S from '@atoms/Img/style';

export function Img({ ...rest }: I.ImgProps) {
  return <S.Wrapper {...rest} />;
}
