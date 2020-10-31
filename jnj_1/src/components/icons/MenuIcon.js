import React from 'react';
import styles from './MenuIcon.module.scss';

import { motion } from 'framer-motion';

const MenuIcon = () => (
  <div 
    className={styles.MenuIcon}
  >
    <motion.div
      whileHover={{ scale: 1.1 }}
    >
      <div></div>
      <div></div>
      <div></div>
    </motion.div>
  </div>
);

export default MenuIcon;