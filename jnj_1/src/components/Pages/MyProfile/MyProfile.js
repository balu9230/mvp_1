import React from 'react';
import styles from './MyProfile.module.scss';

import Header from '../../Header/Header';
import SideBar from '../../SideBar/SideBar';
import Backdrop from '../../basic/Backdrop/Backdrop';

export default function MyProfile() {

  return (
    <div className={styles.MyProfile}>
      <Header />
      <SideBar />
      <Backdrop />
      <div className={styles.MyProfileBody}>
        <p>MY PROFILE</p>
      </div>
    </div>
  );
}