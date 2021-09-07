import React from 'react';

import * as I from '.';
import * as S from '@molecules/Notification/style';

import { Span } from '@atoms/Span/Span';

export const Notification: React.FC<I.NotificationProps> = ({ children, colorprop, ...rest }) => {
  return (
    <S.Wrapper {...rest}>
      <Span displayProp="inline-block" levelProp={4} marginProp={['0']} colorProp={colorprop}>
        {children}
      </Span>
    </S.Wrapper>
  );
};
