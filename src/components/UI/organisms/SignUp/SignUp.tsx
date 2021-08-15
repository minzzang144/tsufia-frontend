import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@organisms/SignUp/style';
import * as IButton from '@atoms/Button';

import { Alert } from '@atoms/Alert/Alert';
import { Button } from '@atoms/Button/Button';
import { Form } from '@atoms/Form/Form';
import { Heading } from '@atoms/Heading/Heading';
import { Input } from '@atoms/Input/Input';
import { RootState } from '@modules';
import { useSignUpFormContext } from '@pages/LogoutHome/LogoutHomeContainer';

export const SignUp: React.FC = () => {
  const { handleSubmit, control, onValid, errors, isValid } = useSignUpFormContext();
  const { loading, error } = useSelector(
    (state: RootState) => ({
      loading: state.authentication.loading,
      error: state.authentication.error,
    }),
    shallowEqual,
  );

  return (
    <S.Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <Heading levelProp={2} marginProp={['0', '0', '10%']}>
          Sign Up
        </Heading>
        <Input
          name="email"
          control={control}
          defaultValue=""
          type="email"
          label="Email"
          variant="outlined"
          errors={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <Input
          name="firstName"
          control={control}
          defaultValue=""
          type="text"
          label="First Name"
          variant="outlined"
          errors={!!errors.firstName}
          helperText={errors.firstName ? errors.firstName.message : ''}
        />
        <Input
          name="lastName"
          control={control}
          defaultValue=""
          type="text"
          label="Last Name"
          variant="outlined"
          errors={!!errors.lastName}
          helperText={errors.lastName ? errors.lastName.message : ''}
        />
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
        <Input
          name="passwordCheck"
          control={control}
          defaultValue=""
          type="password"
          label="Password Check"
          variant="outlined"
          errors={!!errors.passwordcheck}
          helperText={errors.passwordcheck ? errors.passwordcheck.message : ''}
        />
        <Button
          isValid={isValid}
          colorProp={IButton.ColorProp.Black}
          marginProp={['10%', '0', '0', '0']}
          paddingProp={['1rem', '2rem']}
        >
          {isValid && loading === true ? 'Proceeding' : 'Continue'}
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Form>
    </S.Wrapper>
  );
};
