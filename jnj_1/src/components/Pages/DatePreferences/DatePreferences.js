import React from 'react';
import styles from './DatePreferences.module.scss';

import Header from '../../Header/Header';
import SideBar from '../../SideBar/SideBar';
import Backdrop from '../../basic/Backdrop/Backdrop';

export default function DatePreferences() {

  return (
    <div className={styles.DatePreferences}>
      <Header />
      <SideBar />
      <Backdrop />
      <div className={styles.DatePreferencesBody}>
        <p>DATE PREFERENCES</p>
      </div>
    </div>
  );
}