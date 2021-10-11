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
import { useSelector } from 'react-redux';
import { RootState } from '@modules';

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
    onProfileBtnClick: undefined,
  };
  if (isLoggedIn) {
    const { onLogout, isOpen, toggleDrawer, onProfileBtnClick } = useLoginContext();
    loginContext.onLogout = onLogout;
    loginContext.isOpen = isOpen;
    loginContext.toggleDrawer = toggleDrawer;
    loginContext.onProfileBtnClick = onProfileBtnClick;
  }
  const roomPageContext: I.IRoomPageContext = {
    selfUserInRoom: undefined,
    onLeaveRoomListClick: undefined,
    muted: undefined,
  };
  if (where === 'UPDATE') {
    const { selfUserInRoom, onLeaveRoomListClick, onAudioBtnClick, muted } = useRoomPageContext();
    roomPageContext.onLeaveRoomListClick = onLeaveRoomListClick;
    roomPageContext.selfUserInRoom = selfUserInRoom;
    roomPageContext.onAudioBtnClick = onAudioBtnClick;
    roomPageContext.muted = muted;
  }
  const room = useSelector((state: RootState) => state.room.data);

  function renderAudio(isMobile: boolean) {
    if (where === 'UPDATE' && !isMobile) {
      return (
        <List marginprop={['0', '1.5rem', '0', '0']}>
          {room?.game && roomPageContext.muted ? (
            <S.VolumeOffOutline
              onClick={() => roomPageContext.onAudioBtnClick && roomPageContext.onAudioBtnClick()}
            />
          ) : (
            <S.VolumeUpOutline
              onClick={() => roomPageContext.onAudioBtnClick && roomPageContext.onAudioBtnClick()}
            />
          )}
        </List>
      );
    }
  }

  function renderNavigationMenu(isMobile: boolean) {
    return (
      <React.Fragment>
        {where === 'CREATE' && (
          <>
            <List
              onClick={() =>
                isMobile
                  ? (onToggleModal && onToggleModal()) ||
                    (loginContext.toggleDrawer && loginContext.toggleDrawer())
                  : onToggleModal && onToggleModal()
              }
              marginprop={isMobile ? ['1rem', '0', '0', '0'] : undefined}
              paddingProp={['1.5rem']}
              widthprop={isMobile ? '100%' : undefined}
              textalignprop="center"
              colorprop={isMobile ? 'white' : 'black'}
              cursorprop={true}
              shadowprop={true}
              hovershadowprop={true}
            >
              방 반들기
            </List>
            <List
              onClick={() =>
                isMobile
                  ? loginContext.onProfileBtnClick && loginContext.onProfileBtnClick(true)
                  : loginContext.onProfileBtnClick && loginContext.onProfileBtnClick(false)
              }
              marginprop={isMobile ? ['1rem', '0', '0', '0'] : undefined}
              paddingProp={['1.5rem']}
              widthprop={isMobile ? '100%' : undefined}
              textalignprop="center"
              colorprop={isMobile ? 'white' : 'black'}
              cursorprop={true}
              shadowprop={true}
              hovershadowprop={true}
            >
              프로필
            </List>
            <List
              onClick={() => loginContext.onLogout && loginContext.onLogout()}
              colorprop={isMobile ? 'white' : 'black'}
              paddingProp={['1.5rem']}
              widthprop={isMobile ? '100%' : undefined}
              textalignprop="center"
              cursorprop={true}
              shadowprop={true}
              hovershadowprop={true}
            >
              로그아웃
            </List>
          </>
        )}
        {renderAudio(isMobile)}
        {where === 'UPDATE' &&
          roomPageContext.selfUserInRoom &&
          roomPageContext.selfUserInRoom.host === true && (
            <List
              onClick={() =>
                isMobile
                  ? (onToggleModal && onToggleModal()) ||
                    (loginContext.toggleDrawer && loginContext.toggleDrawer())
                  : onToggleModal && onToggleModal()
              }
              colorprop={isMobile ? 'white' : 'black'}
              paddingProp={['1.5rem']}
              widthprop={isMobile ? '100%' : undefined}
              textalignprop="center"
              cursorprop={true}
              shadowprop={true}
              hovershadowprop={true}
            >
              방 수정하기
            </List>
          )}
        {where === 'UPDATE' && (
          <List
            onClick={() =>
              isMobile
                ? (loginContext.toggleDrawer && loginContext.toggleDrawer()) ||
                  (roomPageContext.onLeaveRoomListClick && roomPageContext.onLeaveRoomListClick())
                : roomPageContext.onLeaveRoomListClick && roomPageContext.onLeaveRoomListClick()
            }
            colorprop={isMobile ? 'white' : 'black'}
            paddingProp={['1.5rem']}
            widthprop={isMobile ? '100%' : undefined}
            textalignprop="center"
            cursorprop={true}
            shadowprop={true}
            hovershadowprop={true}
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

              {/* 데크스탑 이상에서만 보이는 네비게이션 모드 */}
              <S.UnorderedListDesktop alignItemsProp="center">
                {renderNavigationMenu(false)}
              </S.UnorderedListDesktop>

              {/* 모바일에서 보이는 네비게이션 모드 */}
              <S.UnorderedListMobile>
                {renderAudio(false)}
                {loginContext.isOpen ? (
                  <S.MenuOpened
                    onClick={() => loginContext.toggleDrawer && loginContext.toggleDrawer()}
                  />
                ) : (
                  <S.Menued
                    onClick={() => loginContext.toggleDrawer && loginContext.toggleDrawer()}
                  />
                )}
              </S.UnorderedListMobile>
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
