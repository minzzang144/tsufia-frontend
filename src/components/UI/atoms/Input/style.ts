import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

export const Wrapper = withStyles({
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
