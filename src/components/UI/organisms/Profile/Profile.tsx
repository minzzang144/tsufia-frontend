import React from 'react';
import { useSelector } from 'react-redux';

import * as S from '@organisms/Profile/style';

import { Provider } from '@auth';
import { Button } from '@atoms/Button/Button';
import { Img } from '@atoms/Img/Img';
import { MediaTable } from '@atoms/Table/Table';
import { Tdata } from '@atoms/Tdata/Tdata';
import { FormModal } from '@molecules/FormModal/FormModal';
import { RootState } from '@modules';
import { useProfileContext } from '@pages/ProfilePage/ProfilePageContainer';
import { useCreateRoomFormContext } from '@routers/LoginRouter';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Profile: React.FC = ({ children, ...rest }) => {
  const user = useSelector((state: RootState) => state.authentication.user);
  const createRoomFormContext = useCreateRoomFormContext();
  const { onProfileUpdateClick } = useProfileContext();

  function getUserInitial(firstName?: string, nickname?: string) {
    let initial: string;
    if (firstName) {
      initial = firstName.substring(0).toUpperCase();
    } else if (nickname) {
      initial = nickname.substring(0).toUpperCase();
    } else {
      return '';
    }
    return initial;
  }

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

  return user ? (
    <S.Wrapper {...rest}>
      <FormModal
        formContext={createRoomFormContext}
        title="방 만들기"
        defaultValue={{ input: '', radio: '' }}
      />
      {user.photo && (
        <Img
          src={user.photo}
          width="70px"
          height="70px"
          borderRadiusProp="50%"
          opacityprop={user.survive === false ? '0.2' : undefined}
          marginprop={['0', '0', '1rem', '0']}
        />
      )}
      {!user.photo && (
        <Img
          justifyContentprop="center"
          alignItemsprop="center"
          widthprop="70px"
          heightprop="70px"
          borderRadiusProp="50%"
          colorprop="white"
          opacityprop={user.survive === false ? '0.2' : undefined}
          marginprop={['0', '0', '1rem', '0']}
        >
          {getUserInitial(user.firstName, user.nickname)}
        </Img>
      )}
      <MediaTable widthprop="100%" maxwidthprop="50%" colorprop="white">
        <tbody>
          <tr>
            <Tdata paddingprop={['4%', '0']} colorprop="white">
              E-mail
            </Tdata>
            <Tdata paddingprop={['4%', '0']} colorprop="white">
              {user.email ?? ''}
            </Tdata>
          </tr>
          <tr>
            <Tdata paddingprop={['4%', '0']}>Name</Tdata>
            <Tdata paddingprop={['4%', '0']}>
              {getUserFullName(user.firstName ?? '', user.lastName ?? '', user.nickname ?? '')}
            </Tdata>
          </tr>
          <tr>
            <Tdata paddingprop={['4%', '0']}>Login</Tdata>
            <Tdata paddingprop={['4%', '0']}>{getLoginMethod(user.provider ?? 0)}</Tdata>
          </tr>
        </tbody>
      </MediaTable>
      <Button
        onClick={() => onProfileUpdateClick(user.id)}
        colorProp="black"
        marginProp={['2rem', '0', '0', '0']}
        paddingProp={['1rem', '2rem']}
      >
        프로필 수정하기
      </Button>
    </S.Wrapper>
  ) : (
    <S.Wrapper {...rest} />
  );
};
