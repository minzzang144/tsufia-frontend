import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import LoginHome from '@pages/LoginHome';
import ProfilePage from '@pages/ProfilePage';
import RoomPage from '@pages/RoomPage';

export const LoginRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LoginHome />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/rooms/:id" exact>
          <RoomPage />
        </Route>
        <Redirect to="*" />
      </Switch>
    </Router>
  );
};
