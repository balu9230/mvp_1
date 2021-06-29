import React from 'react';
import styles from './App.module.scss';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from './components/contexts/AuthContext';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp/SignUp';
import SignIn from './components/Login/SignIn/SignIn';
import Guest from './components/Login/Guest/Guest';
import MyProfile from './components/Pages/MyProfile/MyProfile';
import DatePreferences from './components/Pages/DatePreferences/DatePreferences';
import MyStatistics from './components/Pages/MyStatistics/MyStatistics';
import HowToUseGuide from './components/Pages/HowToUseGuide/HowToUseGuide';
import ContactUs from './components/Pages/ContactUs/ContactUs';
import Logout from './components/Pages/Logout/Logout';

function App() {
  // Medium: True love is about friendship, not passion.
  const { currentUser } = useAuth();

  // <Redirect to={{pathname: '/login', state: {from: props.location}}}

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
          {currentUser ? <Home />: <Redirect to="/login" />}
        </Route>
        <Route path="/my_profile" exact>
          {currentUser ? <MyProfile />: <Redirect to="/login" />}
        </Route>
        <Route path="/date_preferences" exact>
          {currentUser ? <DatePreferences />: <Redirect to="/login" />}
        </Route>
        <Route path="/my_statistics" exact>
          {currentUser ? <MyStatistics />: <Redirect to="/login" />}
        </Route>
        <Route path="/guide" exact>
          {currentUser ? <HowToUseGuide />: <Redirect to="/login" />}
        </Route>
        <Route path="/contact_us" exact>
          {currentUser ? <ContactUs />: <Redirect to="/login" />}
        </Route>
        <Route path="/logout" exact>
          {currentUser ? <Logout />: <Redirect to="/login" />}
        </Route>
        <Route path="/" exact>
          {currentUser ? <Home />: <Redirect to="/login" />}
        </Route>  
      </Switch>
    </div>    
  );
}

export default App;
