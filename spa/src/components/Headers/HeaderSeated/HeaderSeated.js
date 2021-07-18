import React from 'react';
import Logo from '../../Logo/Logo';
import styles from './HeaderSeated.module.scss';
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { toggleSeatedState } from '../../globalState/seatedState';

export default function HeaderSeated() {

  let history = useHistory();
  const toggleSeated = useSetRecoilState(toggleSeatedState);

  function redirectToLobby() {
    toggleSeated()
    history.push("/home");
  }

  return (
    <div className={styles.HeaderSeated}>
      <div className={styles.BackButton} onClick={redirectToLobby}>Leave</div>
      <div className={styles.FillerItemLeft}></div>
      <div className={styles.LogoWrap}>
        <Logo />
      </div>
      <div className={styles.FillerItemRight}></div>
    </div>
  )
}