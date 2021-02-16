import React, { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import { Switch, Route, NavLink, Link } from 'react-router-dom';

import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import Bid from '../Bid/Bid';
import Lobby from '../Lobby/Lobby';
import Chat from '../Chat/Chat';
import SideBar from '../SideBar/SideBar';
import Backdrop from '../basic/Backdrop/Backdrop';

export default function Home(props) {
  
  let mainViewComponent;

  const [mainView, setMainView] = useState("bid");
  console.log('alpha');

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
    <div className={styles.Home}>
      <div className={styles.HomeFixedTop}>
        <Header />
        <NavBar currentView={mainView} clicked={toggleMainView}/>
        <hr/>
      </div>
      <SideBar />
      <Backdrop />
      <div className={styles.HomeBody}>
        {mainViewComponent}
      </div>
    </div>
  );
}
