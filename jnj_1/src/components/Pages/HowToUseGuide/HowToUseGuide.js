import React from 'react';
import styles from './HowToUseGuide.module.scss';

import Header from '../../Header/Header';
import SideBar from '../../SideBar/SideBar';
import Backdrop from '../../basic/Backdrop/Backdrop';

export default function HowToUseGuide() {

  return (
    <div className={styles.HowToUseGuide}>
      <Header />
      <SideBar />
      <Backdrop />
      <div className={styles.HowToUseGuideBody}>
        <p>HOW TO USE GUIDE</p>
      </div>
    </div>
  );
}