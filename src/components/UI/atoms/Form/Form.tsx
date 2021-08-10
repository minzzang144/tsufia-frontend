import React from 'react';

import * as I from '.';

export const Form: React.FC<I.FormProps> = ({ children, ...rest }) => {
  return <form {...rest}>{children}</form>;
};
