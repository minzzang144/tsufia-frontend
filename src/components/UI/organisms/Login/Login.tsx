import React from 'react';
import GoogleLogin from 'react-google-login';
import KakaoLogin from 'react-kakao-login';

import * as S from '@organisms/Login/style';

import GoogleLogo from '@assets/google-logo.png';
import KakaoLogo from '@assets/kakao-logo.svg';
import { Button } from '@atoms/Button/Button';
import { Img } from '@atoms/Img/Img';
import { useLoginFormContext } from '@pages/LogoutHome/LogoutHomeContainer';
import { FormContainer } from '@organisms/FormContainer/FormContainer';

export const Login: React.FC = () => {
  const loginContext = useLoginFormContext();
  const { responseSuccessGoogle, responseErrorGoogle, responseSuccessKakao, responseErrorKakao } =
    loginContext;

  return (
    <S.Wrapper>
      <FormContainer where="login" context={loginContext} />
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
