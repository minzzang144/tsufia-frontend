import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { GoogleLoginRequest, KakaoLoginRequest } from '@api-types';
import { LoginFormInput, SignUpFormInput } from '@atoms/Input';
import LogoutHome from '@pages/LogoutHome';
import IntroductionPage from '@pages/IntroductionPage';
import ExplanationPage from '@pages/ExplanationPage';

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
        <Route path="/" exact>
          <LogoutHome
            onLogin={onLogin}
            onGoogleLogin={onGoogleLogin}
            onKakaoLogin={onKakaoLogin}
            onSignUp={onSignUp}
            toggle={toggle}
            setToggle={setToggle}
          />
        </Route>
        <Route path="/game-introduction" exact>
          <IntroductionPage />
        </Route>
        <Route path="/game-explanation" exact>
          <ExplanationPage />
        </Route>
        <Redirect to="*" />
      </Switch>
    </Router>
  );
};
