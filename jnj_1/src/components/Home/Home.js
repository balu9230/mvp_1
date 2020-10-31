import React from 'react';
import styles from './Home.module.scss';
import { Switch, Route, NavLink, Link } from 'react-router-dom';

import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';

export default function Home(props) {

  return (
    <div className={styles.Home}>
      <Header />
      <NavBar />
      <div className={styles.HomeBody}>
        <p>Home Page</p>
      </div>
    </div>
  );
}
