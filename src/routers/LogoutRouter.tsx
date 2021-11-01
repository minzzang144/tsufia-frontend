import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { GoogleLoginRequest, KakaoLoginRequest } from '@api-types';
import { LoginFormInput, SignUpFormInput } from '@atoms/Input';
import LogoutHome from '@pages/LogoutHome';
import IntroductionPage from '@pages/IntroductionPage';
import ExplanationPage from '@pages/ExplanationPage';
import ContactPage from '@pages/ContactPage';

// Logout Router Props Interface
interface LogoutRouterProps {
  onLogin: (body: LoginFormInput) => Promise<void>;
  onGoogleLogin: (body: GoogleLoginRequest) => Promise<void>;
  onKakaoLogin: (body: KakaoLoginRequest) => Promise<void>;
  onSignUp: (body: SignUpFormInput) => Promise<void>;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

// Login Context Interface
interface ILogoutContext {
  isOpen: boolean;
  toggleDrawer: () => void;
}

// Logout Context 생성
const LogoutContext = createContext<ILogoutContext | undefined>(undefined);

export const useLogoutContext = () => {
  const context = useContext(LogoutContext);
  if (!context) throw new Error('Logout Context가 존재하지 않습니다');
  return context;
};

const LoginWrapper: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // [Header] 네비게이션 토글링 기능
  function toggleDrawer() {
    setIsOpen((prevState) => !prevState);
  }

  const logoutValue = {
    isOpen,
    toggleDrawer,
  };

  return <LogoutContext.Provider value={logoutValue}>{children}</LogoutContext.Provider>;
};

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
        <LoginWrapper>
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
          <Route path="/contact" exact>
            <ContactPage />
          </Route>
        </LoginWrapper>
        <Redirect to="*" />
      </Switch>
    </Router>
  );
};
