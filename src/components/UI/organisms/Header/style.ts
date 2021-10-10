import { UnorderedList } from '@atoms/UnorderedList/UnorderedList';
import { withStyles } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import MenuOpen from '@material-ui/icons/MenuOpen';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

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

  /* Color Styles */
  ${colorStyles}
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: 1rem auto;
  background-color: ${({ theme }) => theme.color.dark};
`;

export const UnorderedListStyled = styled(UnorderedList)`
  @media ${({ theme }) => theme.device.laptop} {
    display: none;
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
