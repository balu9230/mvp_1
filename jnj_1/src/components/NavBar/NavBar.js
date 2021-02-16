import React from 'react';
import styles from './NavBar.module.scss';
import { motion } from 'framer-motion';

export default function NavBar (props) {
  
  let bid_style = `${styles.NavBar}`;
  let lobby_style = `${styles.NavBar}`;
  let chat_style = `${styles.NavBar}`;
  
  // style control for default and other views
  if (props.currentView === "bid") {
    bid_style = `${styles.NavBar} ${styles.Selected}`;
  }
  else if (props.currentView === "lobby") {
    lobby_style = `${styles.NavBar} ${styles.Selected}`;
  }
  else if (props.currentView === "chat") {
    chat_style = `${styles.NavBar} ${styles.Selected}`;
  }
  
  return (
      <div className={styles.NavBar}>
        <motion.button
          className={bid_style}
          name="bid" onClick={props.clicked}
        >
          Bid
        </motion.button>
        <motion.button
          className={lobby_style}
          name="lobby" onClick={props.clicked}
        >
          Lobby
        </motion.button>
        <motion.button
          className={chat_style}
          name="chat" onClick={props.clicked}
        >
          Chat
        </motion.button>
      </div>
  );
}
