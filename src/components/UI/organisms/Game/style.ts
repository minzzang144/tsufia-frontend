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

  @media ${({ theme }) => theme.device.mobile} {
    width: 90%;
  }
`;

const VolumeStyle = withStyles({
  root: {
    cursor: 'pointer',
    color: 'white',
    position: 'absolute',
    top: '2.5rem',
    left: '30%',
    opacity: 0.7,
    transform: 'translate(-50%, -50%)',
    '&:hover': {
      opacity: 1,
    },
    '@media screen and (max-width: 1024px)': {
      left: '40%',
    },
    '@media screen and (max-width: 640px)': {
      left: '60%',
    },
  },
});

export const VolumeUpOutline = VolumeStyle(VolumeUpOutlined);

export const VolumeOffOutline = VolumeStyle(VolumeOffOutlined);
