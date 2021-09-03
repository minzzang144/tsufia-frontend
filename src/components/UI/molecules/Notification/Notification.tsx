import React from 'react';

import * as S from '@molecules/Notification/style';
import { Span } from '@atoms/Span/Span';

export const Notification: React.FC = ({ children, ...rest }) => {
  return (
    <S.Wrapper {...rest}>
      <Span displayProp="inline-block" levelProp={4} marginProp={['0']} colorProp="white">
        {children}
      </Span>
    </S.Wrapper>
  );
};
