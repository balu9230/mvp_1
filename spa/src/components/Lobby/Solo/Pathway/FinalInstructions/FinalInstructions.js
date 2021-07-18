import React, { useEffect, useRef, useState } from 'react';
import styles from './FinalInstructions.module.scss';
import { BsCaretLeft, BsCaretRight } from 'react-icons/bs';
import { soloInstructions } from './InstructionsText';

export default function FinalInstructions() {

  const [currCard, setCurrCard] = useState(0);
  const totalCards = soloInstructions.length;
  
  // store refs for each card so that they can be scrolled into view and focussed
  const refs = useRef([]);

  useEffect(() => {
    refs.current[0].focus();
    refs.current[0].scrollIntoView();
  }, []);

  const decrement = () => {
    const tgt = currCard === 0 ? currCard: currCard-1;
    setCurrCard(tgt);
    refs.current[tgt].focus();
    refs.current[tgt].scrollIntoView();
  }
  const increment = () => {
    const tgt = currCard === totalCards-1 ? currCard: currCard+1;
    setCurrCard(tgt);
    refs.current[tgt].focus();
    refs.current[tgt].scrollIntoView();
  }

  return (
    <div className={styles.FinalInstructions}>
      {/* <div className={styles.Greetings}>
        Greetings
      </div> */}
      <div className={styles.NavNCards}>
        <div className={styles.LeftArrow} onClick={decrement}>
          <BsCaretLeft />
        </div>
        <div className={styles.CardsBox}>
          {
            soloInstructions.map((el, idx) => 
            <div className={styles.Card} key={idx} tabIndex={idx} ref={thisObj => refs.current[idx] = thisObj}>{el}</div>)
          }
        </div>
        <div className={styles.RightArrow} onClick={increment}>
          <BsCaretRight />
        </div>
      </div>
      <div className={styles.CardNum}>
        {currCard+1} / {totalCards}
      </div>
    </div>
  );
};