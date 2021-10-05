import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import * as I from '.';

import { AuthAPI } from '@api';
import { getUser, updateLoading, updateProfileUpdateError } from '@auth';
import { PatchUserRequest } from '@api-types';
import { ProfileUpdatePagePresenter } from '@pages/ProfileUpdatePage/ProfileUpdatePagePresenter';
import { RootState } from '@modules';

// Validate Context 생성
const ProfileUpdateContext = createContext<I.IProfileUpdateContext | undefined>(undefined);

// Validate Context Hook
export const useProfileUpdateContext = () => {
  const context = useContext(ProfileUpdateContext);
  if (!context) throw new Error('Validate Context가 존재하지 않습니다');
  return context;
};

const profileUpdateSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  password: yup.string(),
  checkPassword: yup.string(),
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
  const profileUpdateError = useSelector(
    (state: RootState) => state.authentication.error.profileUpdateError,
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<{ id: string }>();

  async function patchUserProcess(body: PatchUserRequest) {
    try {
      dispatch(updateLoading());
      const response = await AuthAPI.patchUser(body);
      const { ok, error, user } = response;
      if (!ok && error) {
        reset({ firstName: '', lastName: '', password: '', checkPassword: '' });
        dispatch(updateProfileUpdateError(error));
      }
      if (ok && user) {
        dispatch(getUser(user));
        window.alert('프로필 업데이트를 하였습니다');
        history.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading());
    }
  }

  function onValid() {
    const values = getValues();
    const patchParams: PatchUserRequest = {
      ...values,
      userId: +params.id,
    };
    patchUserProcess(patchParams);
  }

  const value = {
    register,
    handleSubmit,
    control,
    onValid,
    errors,
    isValid,
  };

  useEffect(() => {
    return () => {
      dispatch(updateProfileUpdateError(undefined));
    };
  }, [profileUpdateError]);

  return (
    <ProfileUpdateContext.Provider value={value}>
      <ProfileUpdatePagePresenter />
    </ProfileUpdateContext.Provider>
  );
};
