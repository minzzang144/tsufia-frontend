import React from 'react';
import styled from 'styled-components';

import * as I from '.';
import * as S from '@atoms/Button/style';

export const Button: React.FC<I.ButtonProps> = ({ children, onClick, ...rest }) => (
  <React.Fragment>
    {onClick ? (
      <S.Wrapper onClick={() => onClick()} {...rest}>
        {children}
      </S.Wrapper>
    ) : (
      <S.Wrapper {...rest}>{children}</S.Wrapper>
    )}
  </React.Fragment>
);

export const MobileViewButton = styled(Button)`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    display: inline-flex;
  }
`;

Button.defaultProps = {
  colorProp: 'black',
  marginProp: ['0'],
  paddingProp: ['0'],
  borderRadiusProp: '0',
  widthProp: 'auto',
  heightProp: 'auto',
  hoverProp: false,
};
