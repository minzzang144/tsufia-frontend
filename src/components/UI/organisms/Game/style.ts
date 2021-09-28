import { withStyles } from '@material-ui/core';
import VolumeUpOutlined from '@material-ui/icons/VolumeUpOutlined';
import VolumeOffOutlined from '@material-ui/icons/VolumeOffOutlined';
import styled, { css } from 'styled-components';

import * as I from '.';

type BackgroundPick = Pick<I.GameProps, 'backgroundImgprop'>;

const backgroundStyles = css<BackgroundPick>`
  ${({ backgroundImgprop }) =>
    backgroundImgprop &&
    css`
      background-image: url(${backgroundImgprop.image});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: ${backgroundImgprop.size};
    `}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: calc(100vh - 6rem);

  /* Background Styles */
  ${backgroundStyles}
`;

export const VolumeUpOutline = withStyles({
  root: {
    cursor: 'pointer',
    color: 'white',
    position: 'absolute',
    bottom: '1.5rem',
    right: '1.5rem',
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
})(VolumeUpOutlined);

export const VolumeOffOutline = withStyles({
  root: {
    cursor: 'pointer',
    color: 'white',
    position: 'absolute',
    bottom: '1.5rem',
    right: '1.5rem',
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
})(VolumeOffOutlined);
