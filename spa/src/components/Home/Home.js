import React, { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import cn from 'classnames';
import { Switch, Route, NavLink, Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { seatedState } from '../globalState/seatedState';

import Header from '../Headers/Header/Header';
import NavBar from '../NavBar/NavBar';
import Bid from '../Bid/Bid';
import Lobby from '../Lobby/Lobby';
import Chat from '../Chat/Chat';
import SideBar from '../SideBar/SideBar';
import Backdrop from '../basic/Backdrop/Backdrop';
import HeaderSeated from '../Headers/HeaderSeated/HeaderSeated';

export default function Home(props) {
  
  let mainViewComponent;

  const [mainView, setMainView] = useState("bid");
  const seated = useRecoilValue(seatedState);
  console.log('default view:', mainView);

  function toggleMainView (e) {
    console.log('toggleMainView', e.target.name);
    switch (e.target.name) {
      case "bid":
        setMainView("bid");
        break;
      case "lobby":
        setMainView("lobby");
        console.log(`setting toggle, mainView: ${mainView}`)
        break;
      case "chat":
        setMainView("chat");
        break;
      default:
        setMainView("bid");
    }
    console.log(`End of toggle, mainView: ${mainView}`)
  }

  function getView () {
    switch (mainView) {
      case "bid":
        mainViewComponent = <Bid />;
        break;
      case "lobby":
        mainViewComponent = <Lobby />;
        break;
      case "chat":
        mainViewComponent = <Chat />;
        break;
      default:
        mainViewComponent = <Bid />;
    }
    console.log('End of getView, mainView: ', mainView);
    return mainViewComponent;  
  }
  
  getView();

  return (
    <div className={cn(styles.Home, seated ? styles.Hidden: null)}>
      <div className={cn(styles.HomeFixedTop, seated ? styles.Hidden: null)}>
        <Header />
        <NavBar currentView={mainView} clicked={toggleMainView}/>
        <hr/>
      </div>
      <SideBar />
      <Backdrop />
      {seated ? <HeaderSeated />: null}
      <div className={styles.HomeBody}>
        {mainViewComponent}
      </div>
    </div>
  );
}
