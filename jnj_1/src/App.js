import React, { useState } from 'react';
import styles from './App.module.scss';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp/SignUp'
import SignIn from './components/Login/SignIn/SignIn'
import Guest from './components/Login/Guest/Guest'

function App() {
  // Medium: True love is about friendship, not passion.
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  console.log({isAuthenticated});

  let authDisplay;

  if (isAuthenticated) {
    authDisplay = <Home />
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
          {authDisplay}
        </Route>
        <Route path="/">
          {authDisplay}
        </Route>  
      </Switch>
    </div>
  );
}

export default App;
