/* eslint-disable no-case-declarations */
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as I from '.';
import * as S from '@organisms/FormContainer/style';

import { Alert } from '@atoms/Alert/Alert';
import { Button } from '@atoms/Button/Button';
import { Form } from '@atoms/Form/Form';
import { Heading } from '@atoms/Heading/Heading';
import { Input } from '@atoms/Input/Input';
import { Span } from '@atoms/Span/Span';
import { RootState } from '@modules';
import { IValidateContext } from '@pages/ValidatePage';
import { IProfileUpdateContext } from '@pages/ProfileUpdatePage';
import { ILoginContext } from '@pages/LogoutHome/LogoutHomeContainer';

export const FormContainer: React.FC<I.FormContainerProps> = ({ where, context }) => {
  const { loading, error, accessToken, user } = useSelector(
    (state: RootState) => ({
      loading: state.authentication.loading,
      error: state.authentication.error,
      accessToken: state.authentication.token,
      user: state.authentication.user,
    }),
    shallowEqual,
  );
  const params = useParams<{ id: string }>();

  function makeUpForm() {
    let letContext: ILoginContext | IValidateContext | IProfileUpdateContext;

    // 인증완료
    if (accessToken) {
      // 업데이트 하는 유저가 본인이면 Form을 보여준다.
      if (user?.id === Number(params.id)) {
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
                    helperText={
                      letContext.errors.password ? letContext.errors.password.message : ''
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
          case 'profile-update':
            letContext = { ...(context as IProfileUpdateContext) };
            return (
              <>
                {user && (
                  <Form onSubmit={letContext.handleSubmit(letContext.onValid)}>
                    <Heading levelProp={2} marginProp={['0', '0', '3%']}>
                      Profile Update
                    </Heading>
                    <Input
                      name="firstName"
                      control={letContext.control}
                      defaultValue={user.firstName}
                      type="text"
                      label="First Name"
                      variant="outlined"
                      errors={!!letContext.errors.firstName}
                      helperText={
                        letContext.errors.firstName ? letContext.errors.firstName.message : ''
                      }
                    />
                    <Input
                      name="lastName"
                      control={letContext.control}
                      defaultValue={user.lastName}
                      type="text"
                      label="Last Name"
                      variant="outlined"
                      errors={!!letContext.errors.lastName}
                      helperText={
                        letContext.errors.lastName ? letContext.errors.lastName.message : ''
                      }
                    />
                    <Input
                      name="password"
                      control={letContext.control}
                      defaultValue=""
                      type="password"
                      label="Password"
                      variant="outlined"
                      errors={!!letContext.errors.password}
                      helperText={
                        letContext.errors.password ? letContext.errors.password.message : ''
                      }
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
                        letContext.errors.checkPassword
                          ? letContext.errors.checkPassword.message
                          : ''
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
                )}
              </>
            );
          default:
            break;
        }
      }
      // 다른 유저가 패스워드 변경 시도 시, 차단한다
      else {
        return <Alert severity="error">접근 권한이 없습니다</Alert>;
      }
    } else {
      switch (where) {
        case 'login':
          letContext = { ...(context as ILoginContext) };
          return (
            <Form onSubmit={letContext.handleSubmit(letContext.onValid)}>
              <Heading levelProp={2} marginProp={['0', '0', '10%']}>
                Log In
              </Heading>
              <Input
                name="email"
                control={letContext.control}
                defaultValue=""
                type="email"
                label="Email"
                variant="outlined"
                errors={!!letContext.errors.email}
                helperText={letContext.errors.email ? letContext.errors.email.message : ''}
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
              <Button
                isValid={letContext.isValid}
                colorProp="black"
                marginProp={['5%', '0', '0', '0']}
                paddingProp={['1rem', '2rem']}
              >
                {letContext.isValid && loading === true ? 'Proceeding' : 'Continue'}
              </Button>
              {error && <Alert severity="error">{error}</Alert>}
              <Span marginProp={error ? ['0'] : ['3%', '0', '0', '0']}>
                아직 회원이 아니신가요?{' '}
                {
                  <Span onClick={letContext.onSpanClick} highlightProp={true}>
                    회원가입
                  </Span>
                }
              </Span>
            </Form>
          );
        default:
          break;
      }
    }
  }

  return <S.Wrapper>{makeUpForm()}</S.Wrapper>;
};
