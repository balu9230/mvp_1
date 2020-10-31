import React from 'react';
import styles from './SignUp.module.scss';

import Header from '../../Header/Header';

export default function SignUp(props) {

  return (
    <div className={styles.SignUp}>
      <Header />
      <div className={styles.SignUpBody}>
        <p>SIGNUP</p>
      </div>
    </div>
  );
}