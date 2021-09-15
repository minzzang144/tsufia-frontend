import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import styled, { css } from 'styled-components';

import * as I from '.';

type MarginPick = Pick<I.InputProps, 'marginprop'>;
type WidthPick = Pick<I.InputProps, 'widthprop'>;
type FlexPick = Pick<I.InputProps, 'flexprop'>;

const CommonStyles = withStyles({
  root: {
    '& label': {
      color: 'white',
    },
    '& label.Mui-focused': {
      color: '#90caf9',
    },
    '& label.MuiFormLabel-filled:not(.Mui-focused)': {
      opacity: '0',
    },
    '& .MuiOutlinedInput-root': {
      '& input': {
        color: 'white',
      },
      '& fieldset': {
        borderColor: 'white',
      },
      '& fieldset legend span': {
        display: 'none',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#90caf9',
      },
      '&.Mui-focused fieldset legend span': {
        display: 'inline-block',
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

const flexStyles = css<FlexPick>`
  ${({ flexprop }) => {
    switch (flexprop?.length) {
      case 1:
        return css`
          flex: ${flexprop[0]} !important;
        `;
      case 2:
        return css`
          flex: ${flexprop[0]} ${flexprop[1]} !important;
        `;
      case 3:
        return css`
          flex: ${flexprop[0]} ${flexprop[1]} ${flexprop[2]} !important;
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
  /* Flex Styles */
  ${flexStyles}

  /* Margin Styles */
  ${marginStyles}

  /* Width Styles */
  ${widthStyles}
`;
