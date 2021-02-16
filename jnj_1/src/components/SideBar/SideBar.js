import React from 'react';
import styles from './SideBar.module.scss';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { SideBarData } from './SideBarData';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { sideBarActiveState, toggleSideBarState } from './../globalState/sideBarState';
import { FaHome } from 'react-icons/fa';
import { MENU_ICON_SIZE } from './../../styles/styleConstants';

export default function SideBar() {

  const sideBarActive = useRecoilValue(sideBarActiveState);
  const toggleSideBar = useSetRecoilState(toggleSideBarState);
  
  console.log("inside SideBar, showing sideBarActive");
  console.log(sideBarActive);
  
  return (
    <>
      <nav className={cn(styles.SideBar, sideBarActive ? styles.Active: styles.Hidden)}>
        <ul className={styles.Ul}>
          <li key={`sidebar_option_home`} className={styles.OptionItem}>
            <div className={styles.OptionItemLinkWrap}>
              <Link to="/home" onClick={toggleSideBar}>
                <span className={styles.OptionItemIcon}><FaHome size={MENU_ICON_SIZE}/></span>
                <span className={styles.OptionItemText}>Home</span>
              </Link>
            </div>
          </li>
          {
            SideBarData.map((item, index) => (
              <li key={`sidebar_option_${index}`} className={styles.OptionItem}>
                <div className={styles.OptionItemLinkWrap}>
                  <Link to={item["path"]} onClick={toggleSideBar}>
                    <span className={styles.OptionItemIcon}>{item["icon"]}</span>
                    <span className={styles.OptionItemText}>{item["title"]}</span>
                  </Link>
                </div>
              </li>
            ))
          }    
        </ul>
      </nav>
    </>
  );
}