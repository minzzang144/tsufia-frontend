/* eslint-disable no-case-declarations */
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as I from '.';
import * as S from '@organisms/FormContainer/style';

import { Heading } from '@atoms/Heading/Heading';
import { Button } from '@atoms/Button/Button';
import { Form } from '@atoms/Form/Form';
import { Input } from '@atoms/Input/Input';
import { Alert } from '@atoms/Alert/Alert';
import { RootState } from '@modules';
import { IValidateContext } from '@pages/ValidatePage';

export const FormContainer: React.FC<I.FormContainerProps> = ({ where, context }) => {
  const { loading, error } = useSelector(
    (state: RootState) => ({
      loading: state.authentication.loading,
      error: state.authentication.error,
    }),
    shallowEqual,
  );

  function makeUpForm() {
    switch (where) {
      case 'validate-password':
        const { handleSubmit, control, onValid, errors, isValid } = context as IValidateContext;
        return (
          <>
            <Form onSubmit={handleSubmit(onValid)}>
              <Heading levelProp={2} marginProp={['0', '0', '5%']}>
                Validate Password
              </Heading>
              <Input
                name="password"
                control={control}
                defaultValue=""
                type="password"
                label="Password"
                variant="outlined"
                errors={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
              />
              <Button
                isValid={isValid}
                colorProp="black"
                marginProp={['2%', '0', '0', '0']}
                paddingProp={['1rem', '2rem']}
              >
                {isValid && loading === true ? 'Proceeding' : 'Continue'}
              </Button>
              {error && <Alert severity="error">{error}</Alert>}
            </Form>
          </>
        );
      default:
        break;
    }
  }

  return <S.Wrapper>{makeUpForm()}</S.Wrapper>;
};
