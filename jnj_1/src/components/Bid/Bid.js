import React from 'react';
import styles from './Bid.module.scss';
import BidUnit from './BidUnit/BidUnit';

export default function Bid (props) {
  return (
    <div className={styles.Bid}>
      <BidUnit />
      <BidUnit />
    </div>
  );
}