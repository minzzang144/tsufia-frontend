import React from 'react';

import * as S from '@organisms/Profile/style';
import { FormModal } from '@molecules/FormModal/FormModal';
import { useCreateRoomFormContext } from '@/App';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Profile: React.FC = ({ children, ...rest }) => {
  const createRoomFormContext = useCreateRoomFormContext();
  return (
    <S.Wrapper {...rest}>
      <FormModal
        roomFormContext={createRoomFormContext}
        title="방 만들기"
        defaultValue={{ input: '', radio: '' }}
      />
    </S.Wrapper>
  );
};
