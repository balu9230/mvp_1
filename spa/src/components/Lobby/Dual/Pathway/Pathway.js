import React from 'react';
import styles from './Pathway.module.scss';
import FinalInstructions from './FinalInstructions/FinalInstructions';

export default function Pathway({ toSeatCB }) {

  return (
    <div className={styles.Pathway}>
      <FinalInstructions />
      <div>Invite a friend!</div>
      <button onClick={toSeatCB}>Enter</button>
    </div>
  );
};