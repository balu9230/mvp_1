import React from 'react';
import styles from './Header.module.scss';

import Logo from '../Logo/Logo';
import MenuIcon from '../icons/MenuIcon';

export default function Header(props) {
  
  return (
      <header className={styles.Header}>
        <div className={styles.HeaderLeft}>
          <MenuIcon />
        </div>
        <div className={styles.HeaderRight}>
          <Logo />
        </div>
      </header>
  );
}