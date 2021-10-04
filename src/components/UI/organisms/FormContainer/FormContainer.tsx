/* eslint-disable no-case-declarations */
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as I from '.';
import * as S from '@organisms/FormContainer/style';

import { Heading } from '@atoms/Heading/Heading';
import { Button } from '@atoms/Button/Button';
import { Form } from '@atoms/Form/Form';
import { Input } from '@atoms/Input/Input';
import { Alert } from '@atoms/Alert/Alert';
import { RootState } from '@modules';
import { IValidateContext } from '@pages/ValidatePage';
import { IProfileUpdateContext } from '@pages/ProfileUpdatePage';

export const FormContainer: React.FC<I.FormContainerProps> = ({ where, context }) => {
  const { loading, error, user } = useSelector(
    (state: RootState) => ({
      loading: state.authentication.loading,
      error: state.authentication.error,
      user: state.authentication.user,
    }),
    shallowEqual,
  );
  const params = useParams<{ id: string }>();

  function makeUpForm() {
    let letContext: IValidateContext | IProfileUpdateContext;
    switch (where) {
      case 'validate-password':
        letContext = { ...(context as IValidateContext) };
        return (
          <>
            <Form onSubmit={letContext.handleSubmit(letContext.onValid)}>
              <Heading levelProp={2} marginProp={['0', '0', '5%']}>
                Validate Password
              </Heading>
              <Input
                name="password"
                control={letContext.control}
                defaultValue=""
                type="password"
                label="Password"
                variant="outlined"
                errors={!!letContext.errors.password}
                helperText={letContext.errors.password ? letContext.errors.password.message : ''}
              />
              <Button
                isValid={letContext.isValid}
                colorProp="black"
                marginProp={['2%', '0', '0', '0']}
                paddingProp={['1rem', '2rem']}
              >
                {letContext.isValid && loading === true ? 'Proceeding' : 'Continue'}
              </Button>
              {error && <Alert severity="error">{error}</Alert>}
            </Form>
          </>
        );
      case 'profile-update':
        letContext = { ...(context as IProfileUpdateContext) };
        return (
          <>
            <Form onSubmit={letContext.handleSubmit(letContext.onValid)}>
              <Heading levelProp={2} marginProp={['0', '0', '3%']}>
                Profile Update
              </Heading>
              <Input
                name="firstName"
                control={letContext.control}
                defaultValue=""
                type="text"
                label="First Name"
                variant="outlined"
                errors={!!letContext.errors.firstName}
                helperText={letContext.errors.firstName ? letContext.errors.firstName.message : ''}
              />
              <Input
                name="lastName"
                control={letContext.control}
                defaultValue=""
                type="text"
                label="Last Name"
                variant="outlined"
                errors={!!letContext.errors.lastName}
                helperText={letContext.errors.lastName ? letContext.errors.lastName.message : ''}
              />
              <Input
                name="password"
                control={letContext.control}
                defaultValue=""
                type="password"
                label="Password"
                variant="outlined"
                errors={!!letContext.errors.password}
                helperText={letContext.errors.password ? letContext.errors.password.message : ''}
              />
              <Input
                name="checkPassword"
                control={letContext.control}
                defaultValue=""
                type="password"
                label="Check Password"
                variant="outlined"
                errors={!!letContext.errors.checkPassword}
                helperText={
                  letContext.errors.checkPassword ? letContext.errors.checkPassword.message : ''
                }
              />
              <Button
                isValid={letContext.isValid}
                colorProp="black"
                marginProp={['2%', '0', '0', '0']}
                paddingProp={['1rem', '2rem']}
              >
                {letContext.isValid && loading === true ? 'Proceeding' : 'Continue'}
              </Button>
              {error && <Alert severity="error">{error}</Alert>}
            </Form>
          </>
        );
      default:
        break;
    }
  }

  return (
    <S.Wrapper>
      {user?.id === Number(params.id) ? (
        makeUpForm()
      ) : (
        <Alert severity="error">접근 권한이 없습니다</Alert>
      )}
    </S.Wrapper>
  );
};
