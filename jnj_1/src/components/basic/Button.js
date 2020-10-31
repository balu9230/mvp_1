import React from 'react';
import styles from './Button.module.scss';

import { motion } from 'framer-motion';

export default function Button(props) {
  
  return (
  <motion.button
    className={styles.Button} 
    whileHover={{ scale: 1.1 }}
    type="button" onClick={props.clickHandler}
  >
    {props.label}
  </motion.button>
  );
}