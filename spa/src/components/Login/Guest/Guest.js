import React from 'react';
import styles from './Guest.module.scss';
import { Switch, Route, NavLink, Link } from 'react-router-dom';

import Header from '../../Headers/Header/Header';

export default function Guest(props) {

  return (
    <div className={styles.Guest}>
      <Header />
      <div className={styles.GuestBody}>
        <p>GUEST</p>
      </div>
    </div>
  );
}