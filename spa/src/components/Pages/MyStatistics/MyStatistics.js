import React from 'react';
import styles from './MyStatistics.module.scss';

import Header from '../../Headers/Header/Header';
import SideBar from '../../SideBar/SideBar';
import Backdrop from '../../basic/Backdrop/Backdrop';

export default function MyStatistics() {

  return (
    <div className={styles.MyStatistics}>
      <Header />
      <SideBar />
      <Backdrop />
      <div className={styles.MyStatisticsBody}>
        <p>MY STATISTICS</p>
      </div>
    </div>
  );
}