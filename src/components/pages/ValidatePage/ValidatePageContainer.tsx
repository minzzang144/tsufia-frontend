import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import * as I from '.';

import { ValidatePagePresenter } from '@pages/ValidatePage/ValidatePagePresenter';

// Validate Context 생성
const ValidateContext = createContext<I.IValidateContext | undefined>(undefined);

// Validate Context Hook
export const useValidateContext = () => {
  const context = useContext(ValidateContext);
  if (!context) throw new Error('Validate Context가 존재하지 않습니다');
  return context;
};

const validatePasswordSchema = yup.object().shape({
  password: yup.string().required(),
});

export const ValidatePageContainer: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
    reset,
  } = useForm<I.ValidateFormInput>({ mode: 'all', resolver: yupResolver(validatePasswordSchema) });

  function onValid() {
    const values = getValues();
    console.log(values);
    reset({ password: '' });
  }

  const value = {
    register,
    handleSubmit,
    control,
    onValid,
    errors,
    isValid,
  };

  return (
    <ValidateContext.Provider value={value}>
      <ValidatePagePresenter />
    </ValidateContext.Provider>
  );
};
