import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';

import * as I from '.';

import { AuthAPI } from '@api';
import { PostUserPasswordRequest } from '@api-types';
import { updateLoading, updateValidatePasswordError } from '@auth';
import { ValidatePagePresenter } from '@pages/ValidatePage/ValidatePagePresenter';
import { RootState } from '@modules';

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
  const validatePasswordError = useSelector(
    (state: RootState) => state.authentication.error.validatePasswordError,
  );
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();

  async function postUserPasswordProcess(body: PostUserPasswordRequest) {
    try {
      dispatch(updateLoading());
      const response = await AuthAPI.postUserPassword(body);
      const { ok, error } = response;
      if (!ok && error) {
        dispatch(updateValidatePasswordError(error));
        reset({ password: '' });
      }
      if (ok) {
        history.push(`/users/${body.userId}/profile-update`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading());
    }
  }

  function onValid() {
    const values = getValues();
    const postParams: PostUserPasswordRequest = {
      ...values,
      userId: +params.id,
    };
    postUserPasswordProcess(postParams);
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
      if (validatePasswordError) dispatch(updateValidatePasswordError(undefined));
    };
  }, [validatePasswordError]);

  return (
    <ValidateContext.Provider value={value}>
      <ValidatePagePresenter />
    </ValidateContext.Provider>
  );
};
