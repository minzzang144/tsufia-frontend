import React from 'react';

import * as I from '.';

export const Input: React.FC<I.InputProps> = ({ register, ...rest }) => {
  return <input {...register} {...rest} />;
};

Input.defaultProps = {
  type: 'text',
};
