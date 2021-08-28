/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as I from '.';
import * as S from '@organisms/Header/style';

import SiteLogo from '@assets/site-logo.png';
import { List } from '@atoms/List/List';
import { Img } from '@atoms/Img/Img';
import { Heading } from '@atoms/Heading/Heading';
import { UnorderedList } from '@molecules/UnorderedList/UnorderedList';
import { RootState } from '@modules';
import { useCallback } from 'react';
import { useState } from 'react';
import { User } from '@auth';

export const Header: React.FC<I.HeaderProps> = ({
  children,
  isLoggedIn,
  where,
  onToggleModal,
  ...rest
}) => {
  const { currentUser, room } = useSelector(
    (state: RootState) => ({ currentUser: state.authentication.user, room: state.room.data }),
    shallowEqual,
  );
  const [selfUserInRoom, setSelfUserInRoom] = useState<User | undefined>();

  const getSelfUserInRoom = useCallback(() => {
    if (room && currentUser) {
      const self = room.userList.find((user) => user.id === currentUser.id);
      if (self) setSelfUserInRoom(() => self);
    }
  }, [room?.userList, currentUser]);

  useEffect(() => {
    getSelfUserInRoom();
  }, [room?.userList]);

  return (
    <S.Wrapper {...rest}>
      <>
        {isLoggedIn === false && (
          <UnorderedList>
            <List colorProp="black" paddingProp={['2rem', '1.5rem']}>
              게임 소개
            </List>
            <List colorProp="black" paddingProp={['2rem', '1.5rem']}>
              게임 설명
            </List>
            <List colorProp="black" paddingProp={['2rem', '3rem', '2rem', '1.5rem']}>
              연락하기
            </List>
          </UnorderedList>
        )}
        {isLoggedIn === true && (
          <S.SpaceBetween>
            <S.Logo>
              <Img src={SiteLogo} width="50px" height="50px" />
              <Heading levelProp={2} marginProp={['0', '0', '0', '1rem']}>
                Tsufia
              </Heading>
            </S.Logo>
            <UnorderedList>
              {where === 'CREATE' && (
                <>
                  <List onClick={onToggleModal} colorProp="black" paddingProp={['2rem', '1.5rem']}>
                    방 반들기
                  </List>
                  <List colorProp="black" paddingProp={['2rem', '1.5rem']}>
                    프로필
                  </List>
                  <List colorProp="black" paddingProp={['2rem', '1.5rem']}>
                    로그아웃
                  </List>
                </>
              )}
              {where === 'UPDATE' && selfUserInRoom && selfUserInRoom.host === true && (
                <List onClick={onToggleModal} colorProp="black" paddingProp={['2rem', '1.5rem']}>
                  방 수정하기
                </List>
              )}
            </UnorderedList>
          </S.SpaceBetween>
        )}
      </>
    </S.Wrapper>
  );
};

Header.defaultProps = {
  colorProp: 'transparent',
};
