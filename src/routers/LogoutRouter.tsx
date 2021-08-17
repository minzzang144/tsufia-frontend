import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { GoogleLoginRequest, KakaoLoginRequest } from '@api-types';
import { LoginFormInput, SignUpFormInput } from '@atoms/Input';
import LogoutHome from '@pages/LogoutHome';

interface LogoutRouterProps {
  onLogin: (body: LoginFormInput) => Promise<void>;
  onGoogleLogin: (body: GoogleLoginRequest) => Promise<void>;
  onKakaoLogin: (body: KakaoLoginRequest) => Promise<void>;
  onSignUp: (body: SignUpFormInput) => Promise<void>;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogoutRouter: React.FC<LogoutRouterProps> = ({
  onLogin,
  onGoogleLogin,
  onKakaoLogin,
  onSignUp,
  toggle,
  setToggle,
}) => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <LogoutHome
            onLogin={onLogin}
            onGoogleLogin={onGoogleLogin}
            onKakaoLogin={onKakaoLogin}
            onSignUp={onSignUp}
            toggle={toggle}
            setToggle={setToggle}
          />
        </Route>
        <Redirect to="*" />
      </Switch>
    </Router>
  );
};
