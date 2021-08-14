import React from 'react';

import * as S from '@organisms/Login/style';

import { Form } from '@atoms/Form/Form';
import { Input } from '@atoms/Input/Input';
import { useLoginFormContext } from '@pages/LogoutHome/LogoutHomeContainer';
import { Button } from '@atoms/Button/Button';

import * as IButton from '@atoms/Button';
import { Heading } from '@atoms/Heading/Heading';

export const Login: React.FC = () => {
  const { handleSubmit, control, onValid, errors } = useLoginFormContext();

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
          colorProp={IButton.ColorProp.Black}
          marginProp={['10%', '0', '0', '0']}
          paddingProp={['1rem', '2rem']}
        >
          Continue
        </Button>
      </Form>
    </S.Wrapper>
  );
};
