import React from 'react';
import styles from './MenuIcon.module.scss';
import { motion } from 'framer-motion';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { sideBarActiveState, toggleSideBarState } from './../globalState/sideBarState';

function MenuIcon() {

  const sideBarActive = useRecoilValue(sideBarActiveState);
  const toggleSideBar = useSetRecoilState(toggleSideBarState);
  
  return (
    <div className={styles.MenuIcon} onClick={toggleSideBar}>
      <motion.div whileHover={{ scale: 1.05 }}>
        <div></div>
        <div></div>
        <div></div>
      </motion.div>
    </div>
  );
}

export default MenuIcon;

/* Attempt with Font Awesome SVG icons - issue with alignment and caling wrt bg div. Doesn't look uniformly good on diff viewports.
import { FaBars } from 'react-icons/fa';
import cn from 'classnames';
const MenuIcon = () => (
  <div className={styles.MenuIcon}>
    <div className={styles.Bar} whileHover={{ scale: 1.05 }}>
      <FaBars size={30}/>
    </div>
  </div>
);
*/