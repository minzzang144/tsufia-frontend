import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import styled, { css } from 'styled-components';

import * as I from '.';

type MarginPick = Pick<I.InputProps, 'marginprop'>;
type WidthPick = Pick<I.InputProps, 'widthprop'>;

const CommonStyles = withStyles({
  root: {
    '& label': {
      color: 'white',
    },
    '& label.Mui-focused': {
      color: '#90caf9',
    },
    '& .MuiOutlinedInput-root': {
      '& input': {
        color: 'white',
      },
      '& fieldset': {
        borderColor: 'white',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#90caf9',
      },
    },
    '& .MuiFormHelperText-root': {
      color: 'red',
    },
  },
})(TextField);

const marginStyles = css<MarginPick>`
  ${({ marginprop }) => {
    switch (marginprop?.length) {
      case 1:
        return css`
          margin: 0;
          margin: ${marginprop[0]} !important;
        `;
      case 2:
        return css`
          margin: 0;
          margin: ${marginprop[0]} ${marginprop[1]} !important;
        `;
      case 3:
        return css`
          margin: 0;
          margin: ${marginprop[0]} ${marginprop[1]} ${marginprop[2]} !important;
        `;
      case 4:
        return css`
          margin: 0;
          margin: ${marginprop[0]} ${marginprop[1]} ${marginprop[2]} ${marginprop[3]} !important;
        `;
      default:
        break;
    }
  }}
`;

const widthStyles = css<WidthPick>`
  ${({ widthprop }) =>
    widthprop &&
    css`
      width: ${widthprop};
    `}
`;

export const Wrapper = styled(CommonStyles)`
  /* Margin Styles */
  ${marginStyles}

  /* Width Styles */
  ${widthStyles}
`;
