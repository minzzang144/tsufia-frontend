import Menu from '@material-ui/icons/Menu';
import MenuOpen from '@material-ui/icons/MenuOpen';
import VolumeOffOutlined from '@material-ui/icons/VolumeOffOutlined';
import VolumeUpOutlined from '@material-ui/icons/VolumeUpOutlined';
import { withStyles } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { UnorderedList } from '@atoms/UnorderedList/UnorderedList';

import * as I from '.';

type ColorPick = Pick<I.HeaderProps, 'colorProp'>;

const colorStyles = css<ColorPick>`
  ${({ colorProp }) => {
    switch (colorProp) {
      case 'black':
        return css`
          background-color: ${({ theme }) => theme.color.dark};
        `;
      case 'transparent':
        return css`
          background-color: transparent;
        `;
      default:
        break;
    }
  }}
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 5rem;

  /* Color Styles */
  ${colorStyles}
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: 0 auto;
  height: 100%;
  background-color: ${({ theme }) => theme.color.dark};

  @media ${({ theme }) => theme.device.mobile} {
    width: 85%;
  }
`;

export const UnorderedListDesktop = styled(UnorderedList)`
  @media ${({ theme }) => theme.device.laptop} {
    display: none;
  }
`;

export const UnorderedListMobile = styled(UnorderedList)`
  display: none;
  @media ${({ theme }) => theme.device.laptop} {
    display: flex;
  }
`;

const menuStyle = withStyles({
  root: {
    display: 'none',
    cursor: 'pointer',
    color: 'white',
    '@media screen and (max-width: 1024px)': {
      display: 'inline-block',
    },
  },
});

export const Menued = menuStyle(Menu);

export const MenuOpened = menuStyle(MenuOpen);

export const Logo = styled(Link)`
  display: flex;
`;

const VolumeStyle = withStyles({
  root: {
    cursor: 'pointer',
    color: 'white',
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
});

export const VolumeUpOutline = VolumeStyle(VolumeUpOutlined);

export const VolumeOffOutline = VolumeStyle(VolumeOffOutlined);
