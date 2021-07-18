import React from 'react';
import styles from './Login.module.scss';
// import { motion } from 'framer-motion';
import { Switch, Route, Link, useHistory } from 'react-router-dom';

import Header from '../Headers/Header/Header';
import Button from '../basic/Button';

export default function Login(props) {
  
  let history = useHistory();

  function clickedSignUp(e) {
    history.push('/signup');
  }

  function clickedSignIn(e) {
    history.push('/signin');
  }

  function clickedGuest(e) {
    history.push('/guest');
  }

  return (
    <>
      <div className={styles.Login}>
        <Header />
        <div className={styles.LoginBody}>
          <Button label="Sign Up" clickHandler={clickedSignUp}/>
          <Button label="Sign In" clickHandler={clickedSignIn}/>
          <Button label="Guest" clickHandler={clickedGuest}/>
        </div>
        {/*
        <Link to="/signup">
          <Button label="Sign Up" />
        </Link>
        <Link to="/signin">
          <Button label="Sign In" />
        </Link>
        <Link to="/guest">
          <Button label="Guest" />
        </Link>
        */}
      </div>
    </>
  );
}
