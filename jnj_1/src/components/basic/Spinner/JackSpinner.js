import React from 'react';
import styles from './JackSpinner.module.scss';
import { GiCardJackHearts, GiRoyalLove, GiCrownedHeart } from 'react-icons/gi';

export default function JackSpinner() {
  return (
    <div className={styles.Spinner}>
      <GiCrownedHeart className={styles.Icon}/>
    </div>
  );
}
