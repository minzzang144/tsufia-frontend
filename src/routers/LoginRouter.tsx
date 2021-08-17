import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import LoginHome from '@pages/LoginHome';

export const LoginRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <LoginHome />
        </Route>
        <Redirect to="*" />
      </Switch>
    </Router>
  );
};
