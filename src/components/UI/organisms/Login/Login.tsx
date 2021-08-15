import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@organisms/Login/style';

import * as IButton from '@atoms/Button';
import { Button } from '@atoms/Button/Button';
import { Form } from '@atoms/Form/Form';
import { Heading } from '@atoms/Heading/Heading';
import { Input } from '@atoms/Input/Input';
import { RootState } from '@modules';
import { useLoginFormContext } from '@pages/LogoutHome/LogoutHomeContainer';
import { Alert } from '@atoms/Alert/Alert';

export const Login: React.FC = () => {
  const { handleSubmit, control, onValid, errors, isValid } = useLoginFormContext();
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
          Log In
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
