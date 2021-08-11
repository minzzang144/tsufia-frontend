import { TextField } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';

import * as I from '.';

export const Input: React.FC<I.InputProps> = ({
  name,
  control,
  defaultValue,
  type,
  label,
  variant,
  errors,
  helperText,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          variant={variant}
          error={!!errors.email}
          helperText={helperText}
          color={undefined}
        />
      )}
    />
  );
};

Input.defaultProps = {
  type: 'text',
};
