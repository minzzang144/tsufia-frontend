import React from 'react';
import { useForm } from 'react-hook-form';

import * as S from '@organisms/Login/style';

import { Form } from '@atoms/Form/Form';
import { Input } from '@atoms/Input/Input';
import { useFormContext } from '@pages/LogoutHome/LogoutHomeContainer';

export const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const { onLoginValid } = useFormContext();

  return (
    <S.Wrapper>
      <Form onSubmit={handleSubmit(onLoginValid)}>
        <Input
          register={register('email', {
            required: true,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: '이메일 형식이 아닙니다',
            },
          })}
          type="email"
        />
        <Input register={register('password', { required: true })} type="password" />
        <Input type="submit" />
      </Form>
    </S.Wrapper>
  );
};
