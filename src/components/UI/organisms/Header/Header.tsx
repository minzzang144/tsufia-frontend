/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import * as I from '.';
import * as S from '@organisms/Header/style';

import { useLoginContext } from '@/App';
import SiteLogo from '@assets/site-logo.png';
import { List } from '@atoms/List/List';
import { Img } from '@atoms/Img/Img';
import { Heading } from '@atoms/Heading/Heading';
import { UnorderedList } from '@atoms/UnorderedList/UnorderedList';
import { useRoomPageContext } from '@pages/RoomPage/RoomPageContainer';

export const Header: React.FC<I.HeaderProps> = ({
  children,
  isLoggedIn,
  where,
  onToggleModal,
  ...rest
}) => {
  const loginContext: I.ILogoutContext = {
    onLogout: undefined,
  };
  if (isLoggedIn) {
    const { onLogout } = useLoginContext();
    loginContext.onLogout = onLogout;
  }
  const roomPageContext: I.IRoomPageContext = {
    selfUserInRoom: undefined,
    onLeaveRoomListClick: undefined,
  };
  if (where === 'UPDATE') {
    const { selfUserInRoom, onLeaveRoomListClick } = useRoomPageContext();
    roomPageContext.onLeaveRoomListClick = onLeaveRoomListClick;
    roomPageContext.selfUserInRoom = selfUserInRoom;
  }

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
            <S.Logo to="/">
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
                  <List to="/profile" colorProp="black" paddingProp={['2rem', '1.5rem']}>
                    프로필
                  </List>
                  <List
                    onClick={() => loginContext.onLogout && loginContext.onLogout()}
                    colorProp="black"
                    paddingProp={['2rem', '1.5rem']}
                  >
                    로그아웃
                  </List>
                </>
              )}
              {where === 'UPDATE' &&
                roomPageContext.selfUserInRoom &&
                roomPageContext.selfUserInRoom.host === true && (
                  <List onClick={onToggleModal} colorProp="black" paddingProp={['2rem', '1.5rem']}>
                    방 수정하기
                  </List>
                )}
              {where === 'UPDATE' && (
                <List
                  onClick={() =>
                    roomPageContext.onLeaveRoomListClick && roomPageContext.onLeaveRoomListClick()
                  }
                  colorProp="black"
                  paddingProp={['2rem', '1.5rem']}
                >
                  나가기
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
