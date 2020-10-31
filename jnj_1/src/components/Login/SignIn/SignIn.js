import React from 'react';
import styles from './SignIn.module.scss';
import { Switch, Route, NavLink, Link } from 'react-router-dom';

import Header from '../../Header/Header';

export default function SignIn(props) {

  return (
    <div className={styles.SignIn}>
      <Header />
      <div className={styles.SignInBody}>
        <p>SIGNIN</p>
      </div>
    </div>
  );
}