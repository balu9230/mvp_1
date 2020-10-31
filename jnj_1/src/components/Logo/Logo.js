import React from 'react';
import styles from './Logo.module.scss';
import logo from '../../assets/images/logo_text.png'; // interact_logo

import { motion } from 'framer-motion';

const Logo = (props) => (
  <motion.img 
    initial={{}}
    animate={{}}
    
    className={styles.Logo} src={logo} alt="LogoImg" viewBox="100 0 400 400"/>
);

export default Logo;
