import React from 'react';

import * as I from '.';
import * as S from '@atoms/Img/style';

export const Img: React.FC<I.ImgProps> = ({ children, src, ...rest }) => {
  return (
    <React.Fragment>
      {src ? <S.Wrapper src={src} {...rest} /> : <S.SubWrapper {...rest}>{children}</S.SubWrapper>}
    </React.Fragment>
  );
};
