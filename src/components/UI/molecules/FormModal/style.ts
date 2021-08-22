import { FormControl, withStyles } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const CancelIconed = withStyles({
  root: {
    cursor: 'pointer',
    color: 'white',
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
})(CancelIcon);

export const FormContainer = styled.div`
  position: relative;
  border: 2px solid ${({ theme }) => theme.color.light};
  border-radius: 4px;
  width: 50%;
`;

const CommonStyles = withStyles({
  root: {
    '& .MuiFormLabel-root': {
      color: 'white',
    },
    '& .MuiFormGroup-root': {
      color: 'white',
    },
    '& .MuiRadio-colorSecondary': {
      color: 'white',
    },
    '& .MuiRadio-colorSecondary.Mui-checked': {
      color: '#f50057',
    },
  },
})(FormControl);

export const FormControled = styled(CommonStyles)``;
