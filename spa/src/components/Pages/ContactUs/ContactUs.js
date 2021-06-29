import React from 'react';
import styles from './ContactUs.module.scss';

import Header from '../../Header/Header';
import SideBar from '../../SideBar/SideBar';
import Backdrop from '../../basic/Backdrop/Backdrop';

export default function ContactUs() {

  return (
    <div className={styles.ContactUs}>
      <Header />
      <SideBar />
      <Backdrop />
      <div className={styles.ContactUsBody}>
        <p>CONTACT US</p>
      </div>
    </div>
  );
}