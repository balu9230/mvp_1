import React from 'react';
import styles from './Seat.module.scss';

export default function Seat() {
  return (
    <div className={styles.Seat}>
      <div>Screen 1</div>
      <div>Screen 2</div>
      <div>Screen 3</div>
      <div>Screen 4</div>
    </div>
  );
};