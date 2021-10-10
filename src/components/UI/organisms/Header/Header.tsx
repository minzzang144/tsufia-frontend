/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

import * as I from '.';
import * as S from '@organisms/Header/style';

import SiteLogo from '@assets/site-logo.png';
import { List } from '@atoms/List/List';
import { Img } from '@atoms/Img/Img';
import { Heading } from '@atoms/Heading/Heading';
import { UnorderedList } from '@atoms/UnorderedList/UnorderedList';
import { useRoomPageContext } from '@pages/RoomPage/RoomPageContainer';
import { useLoginContext } from '@routers/LoginRouter';
import { Link } from '@atoms/Link/Link';

export const Header: React.FC<I.HeaderProps> = ({
  children,
  isLoggedIn,
  where,
  onToggleModal,
  ...rest
}) => {
  const loginContext: I.ILogoutContext = {
    onLogout: undefined,
    isOpen: undefined,
    toggleDrawer: undefined,
  };
  if (isLoggedIn) {
    const { onLogout, isOpen, toggleDrawer } = useLoginContext();
    loginContext.onLogout = onLogout;
    loginContext.isOpen = isOpen;
    loginContext.toggleDrawer = toggleDrawer;
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

  function renderNavigationMenu(isMobile: boolean) {
    return (
      <React.Fragment>
        {where === 'CREATE' && (
          <>
            <List
              onClick={onToggleModal}
              marginprop={isMobile ? ['1rem', '0', '0', '0'] : undefined}
              paddingProp={['1.5rem']}
              widthprop={isMobile ? '100%' : undefined}
              textalignprop="center"
              colorprop={isMobile ? 'white' : 'black'}
              cursorprop={true}
            >
              방 반들기
            </List>
            <List
              colorprop={isMobile ? 'white' : 'black'}
              paddingProp={['1.5rem']}
              widthprop={isMobile ? '100%' : undefined}
              textalignprop="center"
              cursorprop={true}
            >
              <Link
                to="/profile"
                displayprop="inline-block"
                widthprop={isMobile ? '100%' : undefined}
                colorprop={isMobile ? 'black' : 'white'}
              >
                프로필
              </Link>
            </List>
            <List
              onClick={() => loginContext.onLogout && loginContext.onLogout()}
              colorprop={isMobile ? 'white' : 'black'}
              paddingProp={['1.5rem']}
              widthprop={isMobile ? '100%' : undefined}
              textalignprop="center"
              cursorprop={true}
            >
              로그아웃
            </List>
          </>
        )}
        {where === 'UPDATE' &&
          roomPageContext.selfUserInRoom &&
          roomPageContext.selfUserInRoom.host === true && (
            <List
              onClick={onToggleModal}
              colorprop={isMobile ? 'white' : 'black'}
              paddingProp={['1.5rem']}
              widthprop={isMobile ? '100%' : undefined}
              textalignprop="center"
              cursorprop={true}
            >
              방 수정하기
            </List>
          )}
        {where === 'UPDATE' && (
          <List
            onClick={() =>
              roomPageContext.onLeaveRoomListClick && roomPageContext.onLeaveRoomListClick()
            }
            colorprop={isMobile ? 'white' : 'black'}
            paddingProp={['1.5rem']}
            widthprop={isMobile ? '100%' : undefined}
            textalignprop="center"
            cursorprop={true}
          >
            나가기
          </List>
        )}
      </React.Fragment>
    );
  }

  return (
    <S.Wrapper {...rest}>
      <>
        {isLoggedIn === false && (
          <UnorderedList justifyContentProp="space-evenly">
            <List colorprop="black" paddingProp={['2rem', '1.5rem']}>
              게임 소개
            </List>
            <List colorprop="black" paddingProp={['2rem', '1.5rem']}>
              게임 설명
            </List>
            <List colorprop="black" paddingProp={['2rem', '1.5rem']}>
              연락하기
            </List>
          </UnorderedList>
        )}
        {isLoggedIn === true && (
          <>
            <S.SpaceBetween>
              <S.Logo to="/">
                <Img src={SiteLogo} width="50px" height="50px" />
                <Heading levelProp={2} marginProp={['0', '0', '0', '1rem']}>
                  Tsufia
                </Heading>
              </S.Logo>
              <S.UnorderedListStyled alignItemsProp="center">
                {renderNavigationMenu(false)}
              </S.UnorderedListStyled>

              {loginContext.isOpen ? (
                <S.MenuOpened
                  onClick={() => loginContext.toggleDrawer && loginContext.toggleDrawer()}
                />
              ) : (
                <S.Menued
                  onClick={() => loginContext.toggleDrawer && loginContext.toggleDrawer()}
                />
              )}
            </S.SpaceBetween>
            <Drawer
              open={loginContext.isOpen ? loginContext.isOpen : false}
              onClose={() => loginContext.toggleDrawer && loginContext.toggleDrawer()}
              direction="right"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            >
              <UnorderedList flexDirection="column" alignItemsProp="center">
                {renderNavigationMenu(true)}
              </UnorderedList>
            </Drawer>
          </>
        )}
      </>
    </S.Wrapper>
  );
};

Header.defaultProps = {
  colorProp: 'transparent',
};
