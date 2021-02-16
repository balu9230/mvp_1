import React from 'react';
import styles from './Backdrop.module.scss';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { sideBarActiveState, toggleSideBarState } from './../../globalState/sideBarState';

export default function Backdrop() {

  const sideBarActive = useRecoilValue(sideBarActiveState);
  const toggleSideBar = useSetRecoilState(toggleSideBarState);

  return (
    <>
      {
        sideBarActive ? <div className={styles.Backdrop} onClick={toggleSideBar}></div> : null
      }
    </>
  )
}