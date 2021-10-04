import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import * as I from '.';

import { ProfileUpdatePagePresenter } from '@pages/ProfileUpdatePage/ProfileUpdatePagePresenter';

// Validate Context 생성
const ProfileUpdateContext = createContext<I.IProfileUpdateContext | undefined>(undefined);

// Validate Context Hook
export const useProfileUpdateContext = () => {
  const context = useContext(ProfileUpdateContext);
  if (!context) throw new Error('Validate Context가 존재하지 않습니다');
  return context;
};

const profileUpdateSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  checkPassword: yup.string().required(),
});

export const ProfileUpdatePageContainer: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
    reset,
  } = useForm<I.ProfileUpdateFormInput>({
    mode: 'all',
    resolver: yupResolver(profileUpdateSchema),
  });

  function onValid() {
    const values = getValues();
    console.log(values);
    reset({ firstName: '', lastName: '', password: '', checkPassword: '' });
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
    <ProfileUpdateContext.Provider value={value}>
      <ProfileUpdatePagePresenter />
    </ProfileUpdateContext.Provider>
  );
};
