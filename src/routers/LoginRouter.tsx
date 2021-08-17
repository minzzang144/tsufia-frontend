import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

export const LoginRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">You are Logged In</Route>
        <Redirect to="*" />
      </Switch>
    </Router>
  );
};
