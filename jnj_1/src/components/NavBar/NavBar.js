import React from 'react';
import styles from './NavBar.module.scss';

export default function NavBar (props) {

  return (
    <>
      <div className={styles.NavBar}>
        <div>Bid</div>
        <div>Lobby</div>
        <div>Chat</div>
      </div>
    </>
  );
}
