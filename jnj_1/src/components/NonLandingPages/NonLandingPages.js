import React, { useState } from 'react';
import styles from './NonLandingPages.module.scss';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../Login/Login';
import SignUp from '../Login/SignUp/SignUp';
import SignIn from '../Login/SignIn/SignIn';
import Guest from '../Login/Guest/Guest';

export default function LandingPages (props) {
  // Medium: True love is about friendship, not passion.
  isAuthenticated = props.isAuthenticated;
  
  console.log({isAuthenticated});

  let authDisplay;

  if (isAuthenticated) {
    authDisplay = <Redirect to="/home" />;
  }
  else {
    authDisplay = <Redirect to="/login" />;
  }
  
  // <Redirect to={{pathname: '/login', state: {from: props.location}}}

  console.log({authDisplay});
  return (
    <div className={styles.App}>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/guest" exact>
          <Guest />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/">
          {authDisplay}
        </Route>  
      </Switch>
    </div>
  );
}
