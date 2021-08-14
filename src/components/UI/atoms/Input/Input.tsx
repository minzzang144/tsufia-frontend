import React from 'react';
import { Controller } from 'react-hook-form';

import * as I from '.';
import * as S from '@atoms/Input/style';

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
        <S.Wrapper
          {...field}
          type={type}
          label={label}
          variant={variant}
          error={errors}
          helperText={helperText}
        />
      )}
    />
  );
};

Input.defaultProps = {
  type: 'text',
};
