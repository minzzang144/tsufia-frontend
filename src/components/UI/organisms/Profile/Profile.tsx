import React from 'react';
import { useSelector } from 'react-redux';

import { useCreateRoomFormContext } from '@/App';
import { Provider } from '@auth';
import { Table } from '@atoms/Table/Table';
import { Tdata } from '@atoms/Tdata/Tdata';
import { FormModal } from '@molecules/FormModal/FormModal';
import { RootState } from '@modules';
import * as S from '@organisms/Profile/style';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Profile: React.FC = ({ children, ...rest }) => {
  const user = useSelector((state: RootState) => state.authentication.user);
  const createRoomFormContext = useCreateRoomFormContext();

  function getUserFullName(firstName: string, lastName: string, nickname: string): string {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else {
      return nickname;
    }
  }

  function getLoginMethod(provider: Provider): string {
    switch (provider) {
      case Provider.Local:
        return 'Tsufia';
      case Provider.Google:
        return 'Google';
      case Provider.Kakao:
        return 'Kakao';
      default:
        return '';
    }
  }

  return (
    <S.Wrapper {...rest}>
      <FormModal
        roomFormContext={createRoomFormContext}
        title="방 만들기"
        defaultValue={{ input: '', radio: '' }}
      />
      <Table widthprop="100%" maxwidthprop="50%" colorprop="white">
        <tbody>
          <tr>
            <Tdata paddingprop={['4%', '0']} colorprop="white">
              E-mail
            </Tdata>
            <Tdata paddingprop={['4%', '0']} colorprop="white">
              {user?.email ?? ''}
            </Tdata>
          </tr>
          <tr>
            <Tdata paddingprop={['4%', '0']}>Name</Tdata>
            <Tdata paddingprop={['4%', '0']}>
              {getUserFullName(user?.firstName ?? '', user?.lastName ?? '', user?.nickname ?? '')}
            </Tdata>
          </tr>
          <tr>
            <Tdata paddingprop={['4%', '0']}>Login</Tdata>
            <Tdata paddingprop={['4%', '0']}>{getLoginMethod(user?.provider ?? 0)}</Tdata>
          </tr>
        </tbody>
      </Table>
    </S.Wrapper>
  );
};
