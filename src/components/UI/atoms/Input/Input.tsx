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
  errors,
  helperText,
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
          type={type}
          label={label}
          variant={variant}
          error={errors}
          helperText={helperText}
          {...rest}
        />
      )}
    />
  );
};

Input.defaultProps = {
  type: 'text',
};
