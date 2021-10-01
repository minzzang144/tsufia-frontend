import React from 'react';

import * as S from '@organisms/Profile/style';

export const Profile: React.FC = ({ children, ...rest }) => {
  return <S.Wrapper {...rest}>{children}</S.Wrapper>;
};
