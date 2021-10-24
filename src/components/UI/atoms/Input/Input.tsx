/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Controller } from 'react-hook-form';

import * as I from '.';
import * as S from '@atoms/Input/style';

export const Input: React.FC<I.InputProps> = ({
  children,
  name,
  control,
  defaultValue,
  type,
  label,
  variant,
  disabled,
  errors,
  helperText,
  multiline,
  minRows,
  maxRows,
  fullwidth,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <S.Wrapper
          margin="normal"
          {...field}
          disabled={disabled}
          multiline={multiline}
          minRows={minRows}
          maxRows={maxRows}
          type={type}
          label={label}
          variant={variant}
          error={errors}
          helperText={helperText}
          fullWidth={fullwidth}
          {...rest}
        />
      )}
    />
  );
};

Input.defaultProps = {
  type: 'text',
};
