import React from 'react';
import styles from './BidUnit.module.scss';

export default function BidUnit (props) {
  return (
    <div className={styles.BidUnit}>
      <div className={`{styles.BidUnit} {styles.Title}`}>Title</div>
      <div className={`{styles.BidUnit} {styles.Chart}`}>Chart</div>
      <div className={`{styles.BidUnit} {styles.Buttons}`}>Buttons</div>
    </div>
  );
}