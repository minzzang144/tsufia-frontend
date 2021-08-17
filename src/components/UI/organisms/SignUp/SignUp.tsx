import React from 'react';
import GoogleLogin from 'react-google-login';
import KakaoLogin from 'react-kakao-login';
import { shallowEqual, useSelector } from 'react-redux';

import * as S from '@organisms/SignUp/style';

import GoogleLogo from '@assets/google-logo.png';
import KakaoLogo from '@assets/kakao-logo.svg';
import { Alert } from '@atoms/Alert/Alert';
import { Button } from '@atoms/Button/Button';
import { Form } from '@atoms/Form/Form';
import { Heading } from '@atoms/Heading/Heading';
import { Img } from '@atoms/Img/Img';
import { Input } from '@atoms/Input/Input';
import { Span } from '@atoms/Span/Span';
import { RootState } from '@modules';
import { useLoginFormContext, useSignUpFormContext } from '@pages/LogoutHome/LogoutHomeContainer';

export const SignUp: React.FC = () => {
  const { responseSuccessGoogle, responseErrorGoogle, responseSuccessKakao, responseErrorKakao } =
    useLoginFormContext();
  const { handleSubmit, control, onValid, errors, isValid, onSpanClick } = useSignUpFormContext();
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
        <S.HorizonInputPart>
          <Input
            name="firstName"
            control={control}
            defaultValue=""
            type="text"
            label="First Name"
            variant="outlined"
            errors={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName.message : ''}
            marginprop={['1rem', '1rem', '0.5rem', '0']}
            widthprop="40%"
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
            widthprop="40%"
          />
        </S.HorizonInputPart>
        <S.HorizonInputPart>
          <Input
            name="password"
            control={control}
            defaultValue=""
            type="password"
            label="Password"
            variant="outlined"
            errors={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            widthprop="40%"
            marginprop={['1rem', '1rem', '0.5rem', '0']}
          />
          <Input
            name="checkPassword"
            control={control}
            defaultValue=""
            type="password"
            label="Password Check"
            variant="outlined"
            errors={!!errors.checkPassword}
            helperText={errors.checkPassword ? errors.checkPassword.message : ''}
            widthprop="40%"
          />
        </S.HorizonInputPart>
        <Button
          isValid={isValid}
          colorProp="black"
          marginProp={['5%', '0', '0', '0']}
          paddingProp={['1rem', '2rem']}
        >
          {isValid && loading === true ? 'Proceeding' : 'Continue'}
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
        <Span marginProp={error ? ['0'] : ['3%', '0', '0', '0']}>
          이미 회원이신가요?{' '}
          {
            <Span onClick={onSpanClick} highlightProp={true}>
              로그인
            </Span>
          }
        </Span>
      </Form>
      <S.SocialPart>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              marginProp={['0', '1rem', '0', '0']}
              borderRadiusProp="50%"
              colorProp="white"
              widthProp="50px"
              heightProp="50px"
              hoverProp={true}
            >
              <Img src={GoogleLogo} width="35px" height="35px" borderRadiusProp="50%" />
            </Button>
          )}
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <KakaoLogin
          token={process.env.REACT_APP_KAKAO_CLIENT_ID!}
          onSuccess={responseSuccessKakao}
          onFail={responseErrorKakao}
          render={({ onClick }) => (
            <Button
              onClick={onClick}
              borderRadiusProp="50%"
              colorProp="yellow"
              widthProp="50px"
              heightProp="50px"
              hoverProp={true}
            >
              <Img src={KakaoLogo} width="30px" height="30px" borderRadiusProp="50%" />
            </Button>
          )}
        />
      </S.SocialPart>
    </S.Wrapper>
  );
};
