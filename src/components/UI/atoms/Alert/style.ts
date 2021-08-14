import { Alert } from '@material-ui/lab';
import { withStyles } from '@material-ui/core';

export const Wrapper = withStyles({
  root: {
    backgroundColor: 'transparent',
  },
  standardError: {
    color: '#f44336',
  },
})(Alert);
